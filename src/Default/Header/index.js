
import'./header.scss'
import Logo from './logo.png'
import { Link } from 'react-router-dom'

function Header() {

    const handleMouseOver = (num, length) => {
        const area = document.querySelector('.sub-menu-area-'+num)
        area.style.height = (42 * length) + 'px'
    } 
    const handleMouseOut = (num) => {
        const area = document.querySelector('.sub-menu-area-'+num)
        area.style.height = '0px'
    } 

    return (
        <div id='header' className='col-lg-12'>
            <div className='menu-logo col-lg-7'>
                <img src={Logo} height='100%' />
                <div className='menu'>
                    <div className='menu-item' onMouseOver={() => handleMouseOver(1, 5)} onMouseOut={() => handleMouseOut(1)}><Link style={{textDecoration : 'none', color: 'black'}} to='/categories/sneakers'>SNEAKER</Link>
                        <div className='sub-menu-area-1 sub-menu-area'>
                            <div className='sub-menu-item'>
                                <img width='100%' src='https://bizweb.dktcdn.net/thumb/1024x1024/100/347/923/products/568498c-2.jpg' />
                                Converse
                            </div>
                            <div className='sub-menu-item'>
                                <img width='100%' src='https://product.hstatic.net/1000382698/product/vans-tenis-1_82cfd47099924fefb2120909122be3ca_master.jpg' />
                                Vans
                            </div>
                            <div className='sub-menu-item'>
                                <img width='100%' src='https://selectiveshops.com/wp-content/uploads/2020/11/Captura-de-pantalla-2020-11-17-a-las-22.21.20-190x190.jpg' />
                                Jordan
                            </div>
                            <div className='sub-menu-item'>
                                <img width='100%' src='https://s3.amazonaws.com/images.wonderfulsport.it/P23---nike---DH2987100.JPG' />
                                Nike
                            </div>
                            <div className='sub-menu-item'>
                                <img width='100%' src='https://ostoresneakers.vteximg.com.br/arquivos/ids/214374-1000-1000/adidas-forum-mid-GY5819-0.jpg?v=637816530840600000' />
                                Adidas
                            </div>
                        </div>
                    </div>
                    <div className='menu-item' onMouseOver={() => handleMouseOver(2, 4)} onMouseOut={() => handleMouseOut(2)}>SANDAL
                        <div className='sub-menu-area-2 sub-menu-area'>
                            <div className='sub-menu-item'>
                                <img width='100%' src='https://www.birkenstock.com/on/demandware.static/-/Sites-master-catalog/default/dwad3053fe/1019046/1019046.jpg' />
                                Birkenstock
                            </div>
                            <div className='sub-menu-item'>
                                <img width='100%' src='https://media-www.sportchek.ca/product/div-05-footwear/dpt-80-footwear/sdpt-01-mens/333680987/teva-hurricane-xlt2-420-m-black-ab0bf401-69bc-4077-9dc7-6e29372dbb6d-jpgrendition.jpg' />
                                Teva    
                            </div>
                            <div className='sub-menu-item'>
                                <img width='100%' src='https://cdn.shopify.com/s/files/1/0607/3263/7348/products/f72f15a87d17b174db481ec5fae2530c3b37ffdb_750x.jpg?v=1678376389' />
                                Keen
                            </div>
                            <div className='sub-menu-item'>
                                <img width='100%' src='https://www.nextadventure.net/media/catalog/product/cache/97af5ea3e84fa6710a3d1d02213c1d37/m/i/misprint-navy-sale.jpg' />
                                Chaco
                            </div>
                        </div>
                    </div>
                    <div className='menu-item' onMouseOver={() => handleMouseOver(3, 5)} onMouseOut={() => handleMouseOut(3)}>CUSTOM
                        <div className='sub-menu-area-3 sub-menu-area'>
                            <div className='sub-menu-item'>
                                <img width='100%' src='https://bizweb.dktcdn.net/thumb/1024x1024/100/347/923/products/568498c-2.jpg' />
                                Converse
                            </div>
                            <div className='sub-menu-item'>
                                <img width='100%' src='https://product.hstatic.net/1000382698/product/vans-tenis-1_82cfd47099924fefb2120909122be3ca_master.jpg' />
                                Vans
                            </div>
                            <div className='sub-menu-item'>
                                <img width='100%' src='https://selectiveshops.com/wp-content/uploads/2020/11/Captura-de-pantalla-2020-11-17-a-las-22.21.20-190x190.jpg' />
                                Jordan
                            </div>
                            <div className='sub-menu-item'>
                                <img width='100%' src='https://s3.amazonaws.com/images.wonderfulsport.it/P23---nike---DH2987100.JPG' />
                                Nike
                            </div>
                            <div className='sub-menu-item'>
                                <img width='100%' src='https://ostoresneakers.vteximg.com.br/arquivos/ids/214374-1000-1000/adidas-forum-mid-GY5819-0.jpg?v=637816530840600000' />
                                Adidas
                            </div>
                        </div>
                    </div>
                    <div className='menu-item'>ACCESSORIES</div>
                    <div className='menu-item' onClick={() => {window.scrollTo(
                0,  document.documentElement.scrollHeight)}}>CONTACT</div>
                </div>
            </div>
            <div className='user-search col-lg-4'>
                <div className='search'>
                    <input type='text' placeholder='Search...'/>
                    <i className="fa-solid fa-magnifying-glass icon-search"></i>
                </div>
                <div className='cart'>
                    <i className='bx bx-cart-alt icon-cart'></i>
                </div>
                <div className='user'>
                    <img src="https://res.cloudinary.com/dirzctcko/image/upload/v1691145127/UWD_NodeJS/cyzii71p7ypbbyjujvrv.png" width='100%' />
                </div>
            </div>
        </div>
    );
}

export default Header;