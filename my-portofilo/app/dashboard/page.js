"use client";
import { useState } from 'react';

export default function AdminDash(){
    const [projects, setProjects] = useState([]); // les données
    const [skills, setSkills] = useState([]);
    const [about, setAbout] = useState({});
    const [loading, setLoading] = useState(true); // le chargement
    const [error, setError] = useState(false); // les erreurs
}


    // CRUD OPERATIONS

        //Projects
    const fetchProjects = async () => {
        try {
            // chargement et reset erreurs
            setLoading(true);
            setError(null);

            // API Next
            const res = await fetch("/api/projects");

            // Controle de la requete
            if (!res.ok) {
                throw new Error("Erreur lors du chargement des projets.");
            }

            // Conversion Json
            const data = await res.json();

            // MAJ affichage projets
            setProjects(data.projects || []);
        } catch (err) {
            console.error("erreur:", err);
            setError(err.message);
        } finally {
            setLoading(false); // Annulation du chargement que ce soit succes ou error
        }
    };
            //Skills

            //About


  // Authentification avec Argon2



  




