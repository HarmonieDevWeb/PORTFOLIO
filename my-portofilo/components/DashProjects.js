"use client";
import React, { useState, useEffect } from "react";
import { CirclePlus, Trash2, ChevronDown, ChevronUp, Save, X } from "lucide-react";
import * as Icons from "lucide-react";

export default function DashPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // États pour les données skills
  const [projects, setProjects] = useState([
    {
      name: 'Projet Exemple',
      content: 'Description du projet exemple',
      stack: "",
      create: 'MM-AAAA',
      status: 'En cours',
      state: 'Public',
      link: 'https://exemple.com',
      linkGitHub: 'https://github.com/exemple',
      image: '',
      order: 1,
      visibility: true
    },
  ]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des projets');
        }
        const res = await response.json();

        const projectsArray = res.projects || [];

        setProjects(projectsArray);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) {
    return <div>Chargement des projets...</div>;
  }
  if (error) {
    return <div>Erreur : {error}</div>;
  }

  const remoteProject = async (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };

  const updatedProjects = async (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projects }),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde des projets');
      }
      setSaveStatus('success');
    } catch (err) {
      setSaveStatus('error');
    }
  };

  return (
    <>
      <section className="max-w-4xl mx-auto px-6 py-8 pb-24 space-y-10">

        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={index} className="border-2 border-secondary rounded-2xl overflow-hidden shadow-sm p-4">
              <div className="relative flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-primary">{project.name}</h3>
                <button
                  onClick={() => remoteProject(index)}
                  className="absolute right-1 top-1 p-1 hover:bg-red-100 rounded-full transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
              <div className="w-full mb-5">
                <img src={project.image} alt={project.name} className="w-full h-48 object-cover rounded-lg" />
                <input type="link" value={project.image} placeholder="URL de l'image" onChange={(e) => updatedProjects(index, 'image', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="block text-gray-700">Nom du projet</label>
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => updatedProjects(index, 'name', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Date de création</label>
                  <input
                    type="text"
                    value={project.create}
                    onChange={(e) => updatedProjects(index, 'create', e.target.value)}
                    className="mt-1 block w-full px-3 py-2
  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700">Description</label>
                  <textarea
                    value={project.content}
                    onChange={(e) => updatedProjects(index, 'content', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                  ></textarea>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={() => setProjects([...projects, { name: '', content: '', stack: "", create: '', status: 'En cours', state: 'Privé', link: '', linkGitHub: '', image: '', order: projects.length + 1, visibility: true }])}
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-md hover:bg-primary transition-colors"
          >
            <CirclePlus className="w-5 h-5" />
            Ajouter un projet
          </button>
        </div>
      </section>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setIsSaveModalOpen(true)}
            className="w-full bg-linear-to-r from-secondary to-accent text-white font-semibold py-3 px-6 rounded-full hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Sauvegarder
          </button>
        </div>
      </div>
    </>
  );
}


