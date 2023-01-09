import React, { useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useFirestore } from '../../hooks/useFirestore'

// components
import ProductsList from './ProductsList'

import Add from '../../assets/add.svg'

// styles
import './Shopping.css'

export default function Shopping() {

    const [add, setAdd] = useState(false)
    const [name, setName] = useState('')
    const [formError, setFormError] = useState(null)

    const { addDocument, response } = useFirestore('products')
    const { documents, error } = useCollection('products')

    const addProduct = () => { add ? setAdd(false) : setAdd(true) }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        const product = {
            name,
            status: false,
        }

        await addDocument(product)
        if (!response.error) {
            setName('')
            setAdd(false)
        }

    }


    return (
        <div className='content'>
            <div className='productsWrap'>
                <div className='productsHeader'>
                    <h4>Lista produktów</h4>
                    <img className='addBtn' onClick={addProduct} src={Add} alt='add' />
                </div>
                {add && (
                    <div className='addProductWrap'>
                        <form className='addProduct' onSubmit={handleSubmit}>
                            <label>
                                <span>Nazwa produktu: </span>
                                <input
                                    required
                                    type="text"
                                    maxLength={1000}
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            </label>
                            <button className="btn">Dodaj produkt</button>
                            {formError && <p className="error">{formError}</p>}
                        </form>
                    </div>)}
                <div className='productsItem'>
                    {error && <p className="error">{error}</p>}
                    {documents && <ProductsList products={documents} />}
                </div>
            </div>
        </div>
    )
}
