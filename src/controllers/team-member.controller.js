import { catchAsync } from "../utils/catch-async.js";
import { CustomError } from "../utils/custom-error.js";
import { teamMemberService } from "../services/team-member.service.js";

class TeamMemberController {
    create = catchAsync(async (req, res) => {
        const { body, userId } = req;

        const input = {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email
        };

        if (!input.firstName || !input.lastName || !input.email) {
            throw new CustomError(
                "All fields are required: First Name, Last Name, Email",
                400
            );
        }

        await teamMemberService.create(userId, input);
        res.status(201).send();
    });

    createPassword = catchAsync(async (req, res) => {
        const {
            body: { password, passwordConfirm },
            query: { inviteToken }
        } = req;

        if (!inviteToken) {
            throw new CustomError("Invite Token is missing", 400);
        }

        if(!password || !passwordConfirm) {
            throw new CustomError("Password and Password Confirmation are required", 400)
        }

        if (password !== passwordConfirm) {
            throw new CustomError(
                "Password and Password Confirmation must match",
                400
            );
        }
        await teamMemberService.createPassword(inviteToken, password);

        res.status(200).json({
            message:"You successfully created Password. Now you can log in"
        })
    });
}

export const teamMemberController = new TeamMemberController();
