import axios from "axios"
import { useState, useEffect } from "react"
import "./css/NewAuction.css"

function NewAuction() {
    const [categories, setCategories] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");

    const submit = async e => {
        // Send the form data to the backend
        e.preventDefault();
        const auction = {
            title: title,
            description: description,
            category: category,
            price: price / 100,
            image: image
        };
        let response = await axios.post("http://localhost:8000/newAuction/", auction);
        if (response.status === 201) {
            alert("Auction created");
            window.location.href = "/";
        }
        else {
            alert("Something went wrong");
        }

    }
    
    function CheckFields() {
       useEffect(() => {
        document.getElementById("submit").disabled = !(title && description && category && price);  
       })
    }
    CheckFields();

    function checklength() {
        // Check if the length of the URL is between 5 and 200
       if (image.length > 200 || image.length < 5) {
           document.getElementById("image").classList.remove("is-valid");
           document.getElementById("image").classList.add("is-invalid");
       }
       else {
           document.getElementById("image").classList.remove("is-invalid");
           document.getElementById("image").classList.add("is-valid");
       }
    }

    useEffect(() => {
        // Fetch the categories
        (async () => {
            const { data } = await axios.get("http://localhost:8000/categories/");
            setCategories(data);
        })();    
    }, []);

    return (
        <div>
            <form id="new-auction-form" onSubmit={submit}> 
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input maxLength={15} type="text" name="title" className="form-control new-auction-field" value={title}  onChange={e => setTitle(e.target.value)} placeholder="title" required></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Descriptions</label>
                    <textarea required maxLength={500} type="text" name="description" value={description} onChange={e => setDescription(e.target.value)} className="form-control new-auction-field requiredFIeld"  rows="3"></textarea>
                </div>
                <div className="mb-3">
                    <label>Category</label>
                    <select required className="form-select new-auction-field " aria-label="Default select" name="category" value={category} onChange={e => setCategory(e.target.value)}>
                        <option aria-label="Default select"></option>
                        {categories.map(item => <option key={item[0]} value={item[0]}>{item[1]}</option>)}
                    </select>
                </div>
                <div className="mb-3">
                    <label>Price </label>
                    <span className="badge bg-secondary"> USD</span>
                    <div className="col-auto">
                        <span className="form-text">
                            With cents and no pontuation
                        </span>
                    </div>

                    <input required type="number" name="price" className="form-control new-auction-field" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                
                <div className="mb-3">
                    <label>Image URL <small className="text-muted">optional</small></label>
                    <input type="text" className="form-control new-auction-field" id="image" value={image} onChange={e => setImage(e.target.value)} onBlur={checklength} />
                    <div className="invalid-feedback">
                        Image URL is too long or too short
                    </div>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="d-grid">
                    <button type="submit" id="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
        
    );
}
export default NewAuction