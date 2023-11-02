
import './App.css';
import Header from './Default/Header';
import HomePage from './HomePage';
import Footer from './Default/Footer';
import { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate} from 'react-router-dom';
import Categories from './Categories';
import ShoesDetail from './ShoesDetail';
import EditProfilePage from './UserPage/EditProfile';
import GeneralPage from './UserPage/General';
import PasswordPage from './UserPage/Password';
import axios from 'axios';
import { Context } from './UseContext/ThemeContext';
import ShoeManagement from './Management/ShoesManagement'
import BrandsManagement from './Management/BrandsManagement';
import ImportProductPage from './Management/ImportProductPage';
import SupplierManagerMent from './Management/SupplierManagement';
import ClientsManagement from './Management/ClientsManagement';
import PaymentPage from './PaymentPage';


function App() {
  const [isload, setIsLoad] = useContext(Context)
  const [user, setUser] = useState(null)
  const [brands, setBrands] = useState([])
  const [products, setProducts] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [listMenu, setListMenu] = useState(null)
  const [clients, setClients] = useState([])

  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [pathname]);
  };

  useEffect(() => {
    // Get Data about Products
    axios.get('/products/get-all-product', {headers : {'Content-Type': 'application/json'}})
      .then(res => {
          setProducts(res.data)
      })
  }, [isload])

  useEffect(() => {
      let l1 = []
      let l2 = []
      let sneakers = []
      let sandals = []
      let accessories = []
      let customs = []
      products.forEach(p => {
          if (!l1.includes(p.brand.brandName+"_"+p.category)) {
              l1.push(p.brand.brandName+"_"+p.category)
              l2.push({brand : p.brand.brandName, category : p.category, image : p.brand.logo})
          }
      })
      l2.forEach(item => {
          if (item.category == 'Sneaker') sneakers.push({brand : item.brand, image : item.image})
          else if (item.category == 'Sandal') sandals.push({brand : item.brand, image : item.image})
          else if (item.category == 'Custom') customs.push({brand : item.brand, image : item.image})
          else if (item.category == 'Accessories') accessories.push({brand : item.brand, image : item.image})
      })
      setListMenu({sneakers : sneakers, sandals : sandals, customs : customs, accessories : accessories})
  }, [products])

  useEffect(() => {
    // Get Data about Clients
    let token = 'Bearer ' + localStorage.getItem("token")
    axios.get('/clients/get-all-client-with-number-of-order', {headers : {Authorization : token, 'Content-Type': 'application/json'}})
      .then(res => {
          setClients(res.data)
      })
  }, [isload])


  useEffect(() => {
    if (localStorage.getItem('token') != null) {
        let t = localStorage.getItem("token")
        let username = localStorage.getItem("username")
        let token = 'Bearer ' + t;
        
        // Get Data about Account
        axios.get(`/account/get-account?username=${username}`, {headers : {Authorization : token, 'Content-Type': 'application/json'}}) 
            .then(res => {
                if (res.data != "") {
                  setUser(res.data)
                } else {
                  localStorage.removeItem('token')
                  localStorage.removeItem('username')
                }
            })
    }
  }, [isload])

  useEffect(() => {
    // Get Data about Brands
    axios.get('/brands/get-all-brands', {headers : {'Content-Type': 'application/json'}})
    .then(res => {
        setBrands(res.data)
    })
  }, [isload])

  useEffect(() => {
    let token = 'Bearer ' + localStorage.getItem("token")
    axios.get('/supplier/get-all-suppliers', {headers : {Authorization : token, 'Content-Type': 'application/json'}})
        .then(res=> {
            setSuppliers(res.data)
        })
  }, [isload])

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header user={user} products={products} brands={brands}/>
        <div style={{marginTop : '70px'}}></div>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/account/general' element={user ? <GeneralPage user={user} /> : <Navigate to='/'/>} />
          <Route path='/account/edit-profile' element={user ? <EditProfilePage user={user} /> : <Navigate to='/' replace/>} />
          <Route path='/account/password' element={user ? <PasswordPage user={user} /> : <Navigate to='/' replace/>} />
          <Route path='/account/shoes-management' element={user ? user.admin ? <ShoeManagement brands={brands} products1={products} suppliers={suppliers} /> : <Navigate to='/' replace/> : <Navigate to='/' replace/>} /> 
          <Route path='/account/brands-management' element={user ? user.admin ? <BrandsManagement brands={brands} /> : <Navigate to='/' replace/> : <Navigate to='/' replace/>} /> 
          <Route path='/account/import-product-management' element={user ? user.admin ? <ImportProductPage products={products} /> : <Navigate to='/' replace/> : <Navigate to='/' replace/>} /> 
          <Route path='/account/suppliers-management' element={user ? user.admin ? <SupplierManagerMent suppliers={suppliers} /> : <Navigate to='/' replace/> : <Navigate to='/' replace/>} /> 
          <Route path='/account/clients-management' element={user ? user.admin ? <ClientsManagement clients={clients} /> : <Navigate to='/' replace/> : <Navigate to='/' replace/>} /> 
          <Route path='/payment/product-id/:id/:color/:size/:price/:quantity' element={<PaymentPage products={products} />} />

          {/* Categories */}
          {listMenu ? listMenu.sneakers.map((item, index) => {
            return <Route key={index} path={`/categories/sneakers/${item.brand.toLowerCase().split(' ').join('-')}`} 
              element={<Categories categoryName={'Sneaker'} brandName={item.brand} products={products}/>}/>
          }) : <></>}
          {listMenu ? listMenu.sandals.map((item, index) => {
            return <Route key={index} path={`/categories/sandals/${item.brand.toLowerCase().split(' ').join('-')}`} 
              element={<Categories categoryName={'Sandal'} brandName={item.brand} products={products}/>}/>
          }): <></>}
          {listMenu ? listMenu.customs.map((item, index) => {
            return <Route key={index} path={`/categories/customs/${item.brand.toLowerCase().split(' ').join('-')}`} 
              element={<Categories categoryName={'Custom'} brandName={item.brand} products={products}/>}/>
          }): <></>}
          {listMenu ? listMenu.accessories.map((item, index) => {
            return <Route key={index} path={`/categories/accessories/${item.brand.toLowerCase().split(' ').join('-')}`} 
              element={<Categories categoryName={'Accessories'} brandName={item.brand} products={products}/>}/>
          }) : <></>}


          {/* Products */}
          {products.map((product, index) => {
            return (<Route 
                      key={index} path={`/categories/${product.category.toLowerCase().split(' ').join('-')}s/${product.brand.brandName.toLowerCase().split(' ').join('-')}/${product.name.toLowerCase().split(' ').join('-')}`} 
                      element={<ShoesDetail product={product} products={products} user={user} />} />)
          })} 


        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
