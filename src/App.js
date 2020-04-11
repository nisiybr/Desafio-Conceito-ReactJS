import React,{useState,useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories,setRepositories] = useState([]);

  async function handleAddRepository() {
      const response = await api.post('repositories',{
      title:`Desafio React JS ${Date.now()}`,
      url:"https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-reactjs",
      techs:["Typescript","Javascript"]
    })

    setRepositories([...repositories,response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const data = repositories.filter(repository => repository.id !== id);
    setRepositories(data);
  }
  async function loadRepositories() {
    const response = await api.get('repositories');    
    setRepositories(response.data);
  }
  useEffect(()=>{
    loadRepositories();
  },[])


  return (
    <div>
      <ul data-testid="repository-list">
      {
        repositories.map(repository => (
          <li key = {repository.id}>
            {repository.title} 
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))
      }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
