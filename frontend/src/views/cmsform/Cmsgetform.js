// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
//import Api from "../../utils";


const Cmsgetdata = () => {
  document.title = "Human Race | Cms view form"
  const [data, setData] = useState([])
  const { id } = useParams();
  //  console.log(id);

  useEffect(() => {
    const tnc = "https://cors-anywhere.herokuapp.com/http://pacific-escarpment-05547.herokuapp.com/tnc";
    const faq = "https://cors-anywhere.herokuapp.com/http://pacific-escarpment-05547.herokuapp.com/faq";
    const events = "https://cors-anywhere.herokuapp.com/http://pacific-escarpment-05547.herokuapp.com/events";
    const privacy = "https://cors-anywhere.herokuapp.com/http://pacific-escarpment-05547.herokuapp.com/privacy";
    const press = "https://cors-anywhere.herokuapp.com/http://pacific-escarpment-05547.herokuapp.com/press";

    if (id == 0) {
      fetch("https://cors-anywhere.herokuapp.com/http://pacific-escarpment-05547.herokuapp.com/tnc", {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
        .then(result => {

          var span = document.createElement('span');
          span.innerHTML = result[0].content;

          setData({ title: result[0].title, content: span.textContent || span.innerText })

        }).catch(err => {
          console.log(err)
        })
    } else if (id == 1) {
      fetch("https://cors-anywhere.herokuapp.com/http://pacific-escarpment-05547.herokuapp.com/faq", {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
        .then(result => {
          var span = document.createElement('span');
          span.innerHTML = result[0].content;

          setData({ title: result[0].title, content: span.textContent || span.innerText })

        }).catch(err => {
          console.log(err)
        })
    }
    else if (id == 2) {
      fetch("https://cors-anywhere.herokuapp.com/http://pacific-escarpment-05547.herokuapp.com/privacy", {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
        .then(result => {
          var span = document.createElement('span');
          span.innerHTML = result[0].content;

          setData({ title: result[0].title, content: span.textContent || span.innerText })

        }).catch(err => {
          console.log(err)
        })
    }
    else if (id == 3) {
      fetch("https://cors-anywhere.herokuapp.com/http://pacific-escarpment-05547.herokuapp.com/events", {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
        .then(result => {
          var span = document.createElement('span');
          span.innerHTML = result[0].content;

          setData({ title: result[0].title, content: span.textContent || span.innerText })
        }).catch(err => {
          console.log(err)
        })
    }
    else if (id == 4) {
      fetch("https://cors-anywhere.herokuapp.com/http://pacific-escarpment-05547.herokuapp.com/press", {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
        .then(result => {
          var span = document.createElement('span');
          span.innerHTML = result[0].content;

          setData({ title: result[0].title, content: span.textContent || span.innerText })
        }).catch(err => {
          console.log(err)
        })
    }

    // fetch("https://cors-anywhere.herokuapp.com/http://pacific-escarpment-05547.herokuapp.com/tnc", {
    //   method: "get",
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // }).then(res => res.json())
    //   .then(result => {
    //     console.log(result[0])
    //     setData({ title: result[0].title, content: result[0].content })

    //   })

  }, [])


  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title"> Title </h5>
        <p className="card-title"> {data.title}  </p>

      </div>
      <div className="card-body">
      </div>
      <div className="card-header">
        <h5 className="card-title"> Content </h5>
        <p className="card-title">{data.content}</p>

      </div>
      <a href="/#/cms" size="sm" className="btn btn-primary" style={{ width: "70px", marginTop: "10px", marginLeft: "10px", marginBottom: "10px" }}>Back</a>
    </div>


  )
}


export default Cmsgetdata;