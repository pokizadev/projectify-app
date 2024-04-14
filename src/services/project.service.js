import { prisma } from "../prisma/index.js";
import { CustomError } from "../utils/custom-error.js";
import { objectifyArr } from "../utils/mixed.js";
import {teamMemberService} from "./team-member.service.js"

class ProjectService {
    create = async (input, adminId) => {
        const project = await prisma.project.create({
            data: {
                ...input,
                adminId: adminId
            }
        });

        return project;
    };

    getAll = async (adminId) => {
        const projects = await prisma.project.findMany({
            where: {
                adminId: adminId
            }
        });

        return projects;
    };

    getOne = async (id, adminId) => {
        const project = await prisma.project.findUnique({
            where: {
                id: id
            }
        });

        if (!project) {
            throw new CustomError("Project does not exist", 404);
        }

        if (project.adminId !== adminId) {
            throw new CustomError(
                "Forbidden: This project does not belong to you!",
                403
            );
        }

        return project;
    };

    update = async (id, adminId, update) => {
        await prisma.project.update({
            where: {
                id: id,
                adminId: adminId
            },
            data: {
                ...update
            }
        });
    };

    changeStatus = async (id, adminId, status) => {
        await prisma.project.update({
            where: {
                id: id,
                adminId: adminId
            },

            data: {
                status: status
            }
        });
    };

    addContributor = async (projectId, teamMemberId,adminId) => {
        await this.isProjectBelongsToAdmin(projectId, adminId);
        await teamMemberService.isTeamMemberBelongsToAdmin(
            teamMemberId,
            adminId
        );
        const data = await prisma.contributor.create({
            data: { projectId, teamMemberId },
            select: {
                status: true,
                joinedAt: true,
            },
        });

        return data;
    };

    changeContributorStatus = async (
        projectId,
        teamMemberId,
        adminId,
        status
    ) => {
        await this.isProjectBelongsToAdmin(projectId, adminId);
        await teamMemberService.isTeamMemberBelongsToAdmin(
            teamMemberId,
            adminId
        );
        await prisma.contributor.updateMany({
            where: {
                projectId,
                teamMemberId
            },
            data: {
                status
            }
        });
    };

    getContributors = async (projectId, adminId) => {
        await this.isProjectBelongsToAdmin(projectId, adminId);
        const teamMembers = await prisma.teamMember.findMany({
            where: {
                adminId,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                position: true,
            },
        });

        const contributors = await prisma.contributor.findMany({
            where: {
                teamMemberId: {
                    in: teamMembers.map((teamMember) => teamMember.id),
                },
                projectId: projectId,
            },

            select: {
                teamMemberId: true,
                status: true,
            },
        });

        const teamMembersObj = objectifyArr(teamMembers, "id");

        const contributorsWithDetails = contributors.map((contributor) => {
            return {
                ...teamMembersObj[contributor.teamMemberId],
                status: contributor.status,
            };
        });

        const contributorsObj = objectifyArr(contributors, "teamMemberId");

        const notAssignedContributors = teamMembers.filter(
            (teamMember) => !contributorsObj[teamMember.id]
        );

        return {
            assignedContributors: contributorsWithDetails,
            notAssignedContributors: notAssignedContributors,
        };
    };


    isProjectBelongsToAdmin = async (id, adminId) => {
        const project = await prisma.project.findUnique({
            where: {
                id
            }
        });

        if (!project) {
            throw new CustomError("Project does not exist", 404);
        }
        if (project.adminId !== adminId) {
            throw new CustomError(
                "Forbidden: You are not authorized to perform this action",
                404
            );
        }
    };
}

export const projectService = new ProjectService();
