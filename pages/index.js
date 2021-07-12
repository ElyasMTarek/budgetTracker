import Head from 'next/head'
import { useForm } from 'react-hook-form'
import React, {useEffect} from "react";
import axios from 'axios';
import { useRouter } from 'next/router'
import Router, { route } from 'next/dist/next-server/server/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const router = useRouter();
     
  useEffect(() => {
        
    readNames();

  });
 
      toast.configure()
      const success = router.query["success"];
      if (success==="1"){
        toast("Ausgabe wurde erfolgreich protokolliert! :)",{ autoClose: 2000 });

      } else{
       
      };
   

      function nameIsSelected () {

        var e = document.getElementById('#nameDropdown');
        var strUser = e.value;

        if(strUser ==  "--Bitte wähle einen Namen aus--" ){
          return true;
        }
        else {
          return false;
        }
      };

  async function readNames (){

    try {
      fetch("https://sheet.best/api/sheets/bd0219c5-5d55-42a0-9a0e-fa7ac9bea998/tabs/Namen")
    .then((response) => response.json())
    .then((data) => {

      
      var options = [];
      for (let index = 0; index < data.length; index++) {
      const element = data[index]["Namen"];
      options.push(element);
      }

      var dropdown =  document.querySelector('#nameDropdown');


      var length = dropdown.options.length;
      if(length>0){

        for (let index = length; index >= 0; index--) {
          dropdown.options[index] = null;
        }
       
      }
      var opt = document.createElement("option");
      opt.value= 0;
      opt.innerHTML = "--Bitte wähle einen Namen aus--"; // whatever property it has
      
      // then append it to the select element
      dropdown.appendChild(opt);
      dropdown.selectedIndex = "0"; 

      
      for (let index = 1; index < options.length; index++) {
        var opt = document.createElement("option");
        opt.value= index;
        opt.innerHTML = options[index]; // whatever property it has
        
        // then append it to the select element
        dropdown.appendChild(opt);
        dropdown.selectedIndex = "0"; 
      }

      
    })
    .catch((error) => {
      alert("Screenshotte bitte und schick es Sahra. " +error)
    });
    

      
    } catch (error) {
      
    }
    
    
  }

  async function onSubmitForm(values) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    values["datum"] = today;
    var e = document.querySelector("#nameDropdown");
    var idx = e.value;
    if( e.options[e.selectedIndex].text === "--Bitte wähle einen Namen aus--"){
      alert("Bitte wähle einen Namen aus!")
    }
    else{
    values["name"] = e.options[e.selectedIndex].text;
    console.log(values["name"]);

    var x = document.querySelector("#waehrungDropdown");
    var idc = x.value;
    values["waehrung"]= x.options[x.selectedIndex].text;
    console.log(values["waehrung"]);

    
    
    values["kosten"] = values["kosten"].toString().replace('.',',');
    

    var res;
  const url = "https://sheet.best/api/sheets/bd0219c5-5d55-42a0-9a0e-fa7ac9bea998/tabs/"+values["name"];
    fetch(url, {
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
          window.location.href = window.location.pathname + '?success=1';
        //    router.reload(window.location.pathname).then() => { 
          
          
        //  })
        })
        .catch((error) => {
          // Errors are reported there
        
        });
      }
  }
  return (
    <div className='py-16 px-4 w-screen h-screen flex bg-gray-400'>
      <div className="mx-auto w-full max-w-2xl rounded-xl p-8 shadow bg-white">
        <label className="font-bold text-xl mb-20">Neue Ausgabe</label>
      <form onSubmit={handleSubmit(onSubmitForm)} className='grid grid-cols-1 gap-y-6' >
        <div>
          <label  htmlFor="nameDropdown" className="sr-only">
            Name
          </label>
          <select id="nameDropdown" name="name" type="text" {...register("nameDropdown", { validate:  (value) => value != "SYLVIA"})} className="block bg-gray-100 mt-5 w-full py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500  border-gray-300  rounded-md focus:outline-none focus:ring-2 shadow">
          {errors.nameDropdown && errors.nameDropdown.type === "validate" &&  <span className="text-red-600" >Bitte wähl einen Namen aus!</span>}
          </select>
        </div>
        <div>
          <label htmlFor="bezeichnung" className="sr-only">
            Bezeichnung
          </label>
          <input name="beschreibung" type="text" {...register("beschreibung", { required: false })}className="block w-full shadow py-3 bg-gray-100 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300
            rounded-md focus:outline-none focus:ring-2" placeholder="Beschreibung"/>
             {errors.beschreibung && <span className="text-red-600" >Bitte gib eine Beschreibung deiner Ausgabe ein!</span>}
        </div>
        <div>
          <select name="kategorie" type="text" {...register("kategorie", { required: true })} className="block w-full py-3 px-4 bg-gray-100 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500  border-gray-100  rounded-md focus:outline-none focus:ring-2 shadow">
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
          <input name="kosten" type="number"  {...register("kosten", { required: true, min: 0.10 })}  className="block w-50  bg-gray-100 shadow py-3 px-4  placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300
            rounded-md focus:outline-none focus:ring-2" placeholder="0,00" min="0.00" step="0.01"/> 
            <select id="waehrungDropdown" name="waehrung" {...register("waehrung")}  className="block w-full py-3 px-4 md:ml-6 mt-5 md:mt-0 placeholder-gray-500 bg-gray-100 focus:ring-blue-500 focus:border-blue-500  border-gray-300  rounded-md focus:outline-none focus:ring-2 shadow">
            <option value="Euro" >Euro €</option>
            <option  value="Dollar">Dollar $</option>
            <option  value="Kuna">Kuna kn</option>
            <option  value="Kolumbianischer Peso">Kolumbianischer Peso</option>
            <option  value="Mexikanischer Peso">Mexikanischer Peso</option>
          </select>
          {errors.kosten && <span className="text-red-600">Mindesbetrag ist 0,10!</span>}
        </div>
        <div> 
        <input {...register("zahlungsmethode", { required: true })} type="radio" className="h-5" value="Bargeld" />
        <label className="mx-2">Bargeld </label>
        <input className="ml-5"{...register("zahlungsmethode", { required: true })} type="radio" value="Kartenzahlung" />
        <label className="mx-2">Kartenzahlung</label>
        {errors.zahlungsmethode && <span className="text-red-600" ><br/>Bitte wähl eine zahlungsmethode aus!</span>}</div>
       
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

