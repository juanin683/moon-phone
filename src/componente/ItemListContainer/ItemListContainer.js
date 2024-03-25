import ItemList from "./ItemList";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {getDocs,collection,query,where} from 'firebase/firestore'
import { db } from '../../service/firebase/firebaseConfig'




const  ItemListContainer = () =>{
    const [productos,setProductos] = useState([])

    const {categoria} = useParams()


    useEffect(() =>{

        const collectionRef = categoria
        ? query(collection(db,'Productos'),where('categoria', '==',categoria))
        : collection(db, 'Productos')


        getDocs(collectionRef)
        .then(res =>{
            const productsAdapted = res.docs.map(doc => {
                const data = doc.data()
                return { id: doc.id, ...data} 
            })

            setProductos(productsAdapted)
        })


        .catch(error => {
            console.log(error)
        })


        }, [categoria])

        


    return(
        <>
        <div>
           
            <ItemList productos= {productos}/>
        </div>
        </>
    )
}

export default ItemListContainer;