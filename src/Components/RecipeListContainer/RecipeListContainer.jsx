import { useEffect, useState } from "react";
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import styles from '../RecipeListContainer/RecipeListContainer.module.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const RecipeListContainer = () => {
    const [val, setVal] = useState("Paneer");
    const [text, setText] = useState("");
    const [recipeData, setRecipeData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        setIsError(false);
        axios(`https://api.edamam.com//search?q=${text ? text : val}&app_id=40675c20&app_key=6a11bb90daa4480c730cf3ff73d5d2e5`)
            .then((res) => {
                console.log(res.data.hits);
                setRecipeData(res.data.hits);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsError(true);
                setIsLoading(false);
            })
    }, [text])


    const inputChangeHandler = (e) => {
        setText(e.target.value);
    };

    const [show, setShow] = useState(false);
    const [detail, setDietail] = useState([]);
    const [list, setList] = useState([]);
    const handleClose = () => setShow(false);
    const [showFav, setShowFav] = useState(false);
    const handleFavClose = () => setShowFav(false);

    useEffect(() => {
        window.localStorage.setItem('todoList', JSON.stringify(list));
    }, [list]);

    useEffect(() => {
        const RecipeList = JSON.parse(window.localStorage.getItem('RecipeList')) || [];
        setList(RecipeList);
    }, []);
    
    const handleShow = (Recipe) => {
        setShow(true);
        setDietail([{ ...Recipe }]);
        console.log(detail)
    };

    const addItemHandler = (item) => {
        const items = [...list];
        items.push(item);
        console.log(item);
        setList(items);
    };

    const favoriteHandler = () => {
        setShowFav(true);
    }

    const deleteHandler = (taskIndex) => {
        console.log("Deeted")
        const items = [...list];
        items.splice(taskIndex, 1);
        setList(items);
      };

    return (
        <>
            {/* Searchbox*/}
            <div className={styles.searchDiv}>
                <div><input type="text" placeholder="Search Recipe" onChange={inputChangeHandler} value={text} className={styles.searchBox} />
                </div>
                <div><h6 style={{ backgroundColor: "lavenderblush" }} onClick={favoriteHandler} className={styles.favoriteLink}>Favorites</h6></div>
            </div>
            <div style={{ marginTop: "30px" }}>
                {isLoading && (
                    <>
                        <div className="spinner-border text-danger p-5" role="status">
                            <div className="sr-only"></div>
                        </div>
                    </>
                )}
            </div>

            {!isLoading && (
                <>
                    {!isError && (
                        <>
                            {/* RecipeCard  */}
                            < div className={styles.container}>
                                {recipeData.map((recipe, index) => {

                                    if (index < 8) {
                                        const title=recipe.recipe.label
                                        return <Card style={{ width: '18rem', margin: '10px 0 20px 0', background: "lavenderblush" }} key={index}>
                                            <Card.Img variant="top" src={recipe.recipe.image} />
                                            <Card.Body>
                                            
                                                <Card.Title>{title.substring(0, 15)}</Card.Title>
                                                <Button style={{ margin: "5px" }} variant="primary" onClick={() => handleShow(recipe)}>View</Button>
                                                {'  '}
                                                {/* <Button variant="warning" href={recipe.recipe.url}>More</Button> */}
                                                <Button variant="warning" onClick={() => { addItemHandler([recipe]) }}>Add to Favorites</Button>
                                            </Card.Body>
                                        </Card>
                                    }
                                }

                                )}
                            </div>
                        </>
                    )}
                    {isError && <h3 style={{ color: 'red' }}>Error: Recipe not found 😢Please try after some time.👍</h3>}


                </>
            )
            }


            {/*Recipe Detail Modal */}
            <Modal show={show} onHide={handleClose}>
                {detail.map((x) => {
                    return (
                        <>
                            <Modal.Header closeButton>
                                <Modal.Title>{x.recipe.label}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className={styles.modalBox}>
                                    
                                    <div>
                                        <img src={x.recipe.image} alt={x.recipe.label} />
                                    </div>
                                    <h2 style={{color: "brown"}}>Ingredients</h2>
                                    <div>{(x.recipe.ingredients).map((ingre, index) => {
                                        return (
                                            <li key={index}>{ingre.text}</li>
                                        );
                                    })}</div>
                                    <h2 style={{color: "brown"}}>Cooking Instructions</h2>
                                    
                                    <Button variant="warning" href={x.recipe.url}>on {x.recipe.source}</Button>
                                    
                                    <div>
                                    
                                    </div>
                                    
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={() => { addItemHandler(detail) }}>Add to Favorites</Button>
                            </Modal.Footer>
                        </>
                    )
                })}

            </Modal>

            {/*Favoirite*/}
            <Modal show={showFav} onHide={handleFavClose}>
                <>
                    <Modal.Header closeButton>
                        <Modal.Title>Favorites</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <table className="table caption-top table-hover" style={{textAlign:"center"}}>
                            <thead class="table-dark">
                                <tr>
                                    <th scope="col">Recipe Name</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((x, id) => {
                                    return (
                                        x.map((y,index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{y.recipe.label}</td>
                                                    <td><img src={y.recipe.image} alt={y.recipe.label} style={{ height: "100px", width: "100px" }} /></td>
                                                    <td><Button
                                                        onClick={() => {
                                                            deleteHandler(index);
                                                        }}
                                                    >Delete</Button>
                                                    {'  '}
                                                    <Button variant="warning"
                                                        onClick={() => handleShow(y)} style={{marginTop:"5px"}}
                                                    >View</Button>

                                                    </td>
                                                </tr>
                                            )
                                        })
                                    )
                                })}
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleFavClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </>
            </Modal>
        </>
    );
};

export default RecipeListContainer;