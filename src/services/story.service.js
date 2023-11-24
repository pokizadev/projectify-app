import { prisma } from "../prisma/index.js";
import { projectService } from "../services/project.service.js";

class StoryService {
    create = async (input, adminId) => {
        await projectService.isProjectBelongsToAdmin(input.projectId, adminId);

        const story = await prisma.story.create({
            data: input
        });
        return story;
    };
    
    getOne = async (id, projectId) => {
        const story = await prisma.story.findUnique({
            where: {
                id: id
            }
        });

        if (!story) {
            throw new CustomError("Story does not exist", 404);
        }

        if (story.projectId !== projectId) {
            throw new CustomError(
                "Forbidden: This story does not belong to you!",
                403
            );
        }

        return story;
    };
}

export const storyService = new StoryService();
