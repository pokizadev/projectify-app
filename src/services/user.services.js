import { prisma } from "../prisma/index.js";
import { bcrypt } from "../utils/bcrypt.js";

class UserService {
    signUp = async (input) => {
        try {
            await prisma.user.create({
                data: input
            });
        } catch (error) {
            throw new Error(error);
        }
    };
    login = async (input) => {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    email: input.email
                },
                select: {
                    id: true,
                    status: true,
                    password: true
                }
            });

            if (!user) throw new Error("Invalid Credentials");

            if (user.status === "INACTIVE") {
                const activationToken = crypto.createToken();
                const hashedActivationToken = crypto.hash(activationToken);

                await prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        activationToken: hashedActivationToken
                    }
                });

                await mailer.sendActivationMail(input.email, activationToken);

                throw new Error(
                    "We just sent you activation email. Follow instructions"
                );
            }

            const isPasswordMatches = await bcrypt.compare(
                input.password,
                user.password
            );
            if (!isPasswordMatches) {
                throw new Error("Invalid Credentials");
            }
        } catch (error) {
            throw error;
        }
    };
}
export const userService = new UserService();
