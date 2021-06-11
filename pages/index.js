import Head from 'next/head'
import { useForm } from 'react-hook-form'
import React from "react";
import axios from 'axios';
import { useRouter } from 'next/router'
import Router, { route } from 'next/dist/next-server/server/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const router = useRouter();


 
      toast.configure()
      const success = router.query["success"];
      if (success==="1"){
        toast("Ausgabe wurde erfolgreich protokolliert! :)");
        console.log("amk");


      };
   

   

  async function onSubmitForm(values) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    values["date"] = today;
  
    fetch("https://sheet.best/api/sheets/bd0219c5-5d55-42a0-9a0e-fa7ac9bea998", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((r) => r.json())
        .then((values) => {
          // The response comes here
          console.log(values);
          window.location.href = window.location.pathname + '?success=1';
        //   router.reload(window.location.pathname).then() => { 
          
          
        // })
        })
        .catch((error) => {
          // Errors are reported there
          console.log(error);
        });
      // let config = {
      //   method: 'post',
      //   url: "https://sheet.best/api/sheets/1cf0d28e-720b-4788-9cbd-df31ced16847",
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },rm -rf .git*
      //   data: values,
      // };

      // try {
      //   const response = await axios(config);
      //   console.log(response);

      // }
      // catch(err){
      //   console.log(err);
      // }
  }
  return (
    <div className='py-16 px-4 w-screen h-screen flex bg-gray-400'>
      <div className="mx-auto w-full max-w-2xl rounded-xl p-8 shadow bg-white">
        <label className="font-bold text-xl mb-20">Neue Ausgabe</label>
      <form onSubmit={handleSubmit(onSubmitForm)} className='grid grid-cols-1 gap-y-6' >
        <div>
          <label  htmlFor="name" className="sr-only">
            Name
          </label>
          <input type="text" name="name" {...register("name", { required: true })}
            className="block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300
            rounded-md focus:outline-none focus:ring-2" placeholder="Name"/>
            {errors.name && <span  className="text-red-600">Bitte gib deinen Namen ein!</span>}
        </div>
        <div>
          <label htmlFor="bezeichnung" className="sr-only">
            Bezeichnung
          </label>
          <input name="beschreibung" type="text" {...register("beschreibung", { required: true })}className="block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300
            rounded-md focus:outline-none focus:ring-2" placeholder="Beschreibung"/>
             {errors.beschreibung && <span className="text-red-600" >Bitte gib eine Beschreibung deiner Ausgabe ein!</span>}
        </div>
        <div>
          <select name="kategorie" type="text" {...register("kategorie", { required: true })} className="block w-full py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500  border-gray-300  rounded-md focus:outline-none focus:ring-2 shadow">
            <option value="An & Rückreise">An-& Rückreise</option>
            <option value="Verkehrsmittel">Verkehrsmittel vor Ort</option>
            <option value="Unterkunft">Unterkunft</option>
            <option value="Unterkunft - sonstige Ausgaben">Unterkunft - sonstige Ausgaben (Getränke, Wellness etc.)</option>
            <option value="Essen & Getränke">Essen & Getränke (in Restaraunts, Cafés etc.)</option>
            <option value="Einkäufe">Einkäufe</option>
            <option value="Kultur, Sport, Wellness">Kultur, Sport, Wellness</option>
            <option value="Sonstige Ausgabenm">Sonstige Ausgaben</option>
          </select>
          {errors.kategorie && <span className="text-red-600">Bitte wähle eine kategorie aus!</span>}
        </div>
        <div className="md:flex">
        <label htmlFor="bezeichnung" className="sr-only">
            Bezeichnung
          </label>
          <input name="money" type="number"  {...register("money", { required: true, min: 0.10 })}  className="block w-50 shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300
            rounded-md focus:outline-none focus:ring-2" placeholder="0.00" min="0.00" step="0.01"/> 
            <select name="currency" {...register("currency")}  className="block w-full py-3 px-4 md:ml-6 mt-5 md:mt-0 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500  border-gray-300  rounded-md focus:outline-none focus:ring-2 shadow">
            <option value="Euro">Euro €</option>
            <option value="Dollar">Dollar $</option>
            <option value="Kuna">Kuna kn</option>
          </select>
          {errors.money && <span className="text-red-600">Mindesbetrag ist 0.10!</span>}
        </div>
          
        <div>
          <button type="submit" className="inline-flex justify-center py-3 px-6 border border-transparent shadow text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Speichern
          </button>
        </div>

      </form>
      </div>
    </div>
  )
}

