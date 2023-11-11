import { catchAsync } from "../utils/catch-async.js";
import { CustomError } from "../utils/custom-error.js";
import { teamMemberService } from "../services/team-member.service.js";

class TeamMemberController {
    create = catchAsync(async (req, res) => {
        const { body, userId } = req;

        const input = {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
        };

        if (!input.firstName || !input.lastName || !input.email) {
            throw new CustomError(
                "All fields are required: First name, Last Name, Email",
                400
            );
        }

        await teamMemberService.create(userId, input);
        res.status(201).send();
    });

}


export const teamMemberController = new TeamMemberController();