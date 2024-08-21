import * as z from 'zod'

export const ProjectsSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.date(),
  ownerId: z.number()
})
export type Projects = z.infer<typeof ProjectsSchema>

export const UsersSchema = z.object({
  id: z.number(),
  fullName: z.string()
})
export type Users = z.infer<typeof UsersSchema>

export const UserWithProjectsSchema = UsersSchema.extend({
  projects: z.array(ProjectsSchema)
})

export type UserWithProjects = z.infer<typeof UserWithProjectsSchema>
