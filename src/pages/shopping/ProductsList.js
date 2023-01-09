import { useFirestore } from '../../hooks/useFirestore'

// styles
import './ProductsList.css'

import Delete from '../../assets/delete.svg'
import Done from '../../assets/done.svg'
import Cart from '../../assets/cart.svg'


export default function ProductsList({ products }) {

    const { deleteDocument } = useFirestore('products')
    const { updateDocument } = useFirestore('products')

    return (
        <div className='productsList'>
            {products.length === 0 && <p>Brak informacji!</p>}
            {products.map(product => (

                <div key={product.id} className='productBox'>
                    <div className='productHeading'>
                        <div className='product'>
                            <p>{product.name}</p>
                            {product.status && (
                                <img className='done' src={Done} alt='done' onClick={() => updateDocument(product.id, { status: false })} />
                            )}
                            {!product.status && (
                                <img className='cart' src={Cart} alt='shop' onClick={() => updateDocument(product.id, { status: true })} />
                            )}
                        </div>
                        <img className='deleteBtn' src={Delete} alt='delete' onClick={() => { deleteDocument(product.id) }} />
                    </div>
                </div>
            ))}
        </div>
    )
}