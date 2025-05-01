import Service from "services/github.service"
import { Members } from "database/models/members.model";
import { Projects } from "database/models/projects.model";
import { DEFAULT } from "./types/project.type";

const service = new Service();

export const initializeProjects = async () => {
  const members = await Members.find();

  for (const member of members) {
    try {
      const { success, data: repos } = await service.getRepos(member.tag);
      
      console.log("Инициализирую проекты " + member.tag);
  
      if (!success || !Array.isArray(repos)) continue;
      if (repos.length === 0) continue;
  
      console.log(repos);
      const projects = await service.resolveRepos(repos);
  
      for (const project of projects) {
        try {
          console.log("Инициализирую " + project.name);
          const p = await Projects.create({ ...DEFAULT, ...project});
          console.log(p.name + " инициализирован");
        } catch {
          continue;
        };
      }
    } catch (error) {
      console.error(error);
      continue;
    }
  };
}