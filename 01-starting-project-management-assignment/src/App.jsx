import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSideBar from "./components/ProjectsSideBar";
function App() {

  const [projectState,setProjectState] = useState({
    selectedProjectId:undefined,
    projects: []
  });

  function handleStartAddProject() {
    setProjectState( prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    })
  }

    function handleAddProject(projectData) {
      setProjectState( prevProject => {
          const newProject = {
            ...projectData,
            id: Math.round(Math.random()*100)
          }
          return {
            ...prevProject,
            selectedProjectId: undefined,
            projects: [...prevProject.projects,newProject]
          }
      })
  }
  console.log(projectState);
  let content;
   if(projectState.selectedProjectId === null)
   {
      content = <NewProject onAdd={handleAddProject} />;
   }else if(projectState.selectedProjectId === undefined){
      content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
   }

  
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSideBar 
          onStartAddProject={handleStartAddProject} 
          projects={projectState.projects}
          />
      { content }
    </main>
  );
}

export default App;
