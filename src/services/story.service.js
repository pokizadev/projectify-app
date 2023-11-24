import { prisma } from "../prisma/index.js";
import { projectService } from "../services/project.service.js";
import { CustomError } from "../utils/custom-error.js";

class StoryService {
    create = async (input, adminId) => {
        await projectService.isProjectBelongsToAdmin(input.projectId, adminId);

        const story = await prisma.story.create({
            data: input
        });
        return story;
    };

    getOne = async (id) => {
        const story = await prisma.story.findUnique({
            where: {
                id: id
            }
        });

        if (!story) {
            throw new CustomError("Story does not exist", 404);
        }

        if (story.adminId !== story.projectId.adminId) {
            throw new CustomError(
                "Forbidden: This story does not belong to you!",
                403
            );
        }

        return story;
    };

    getAll = async (adminId, projectId) => {
        const stories = await prisma.story.findMany({
            where: {
                adminId: adminId,
                projectId: projectId
            }
            // select: {
            //     id: true,
            //     title: true,
            //     description: true,
            //     status: true,
            //     point: true,
            //     due: true
            // }
        });

        if (!projectId) {
            throw new CustomError("Please Provide Project Id", 400);
        }

        if (adminId !== projectId.adminId) {
            throw new CustomError("Project does not Belong to you");
        }
        return stories;
    };
}

export const storyService = new StoryService();
