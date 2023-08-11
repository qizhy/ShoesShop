
import './categories.scss'

function Categories({categoryName}) {
    return (
        <div className='categories col-lg-12'>
            <div className='cohesive col-lg-12'>
                Home / Categories / Sneaker / Converse
            </div>
            <h2 className='title col-lg-12'>
                Converse
            </h2>
            <p className='number-of-item'>
                249 item
            </p>
            <div className='col-lg-12' style={{display:'flex', justifyContent : 'start', padding : '0 40px'}}>
                <div className='col-lg-3 option'>
                    <div className='item col-lg-12'>
                        <h5 className='col-lg-12'>Size</h5>
                        <div className='content col-lg-12'>
                            <div className='sizes'>36</div>
                            <div className='sizes'>37</div>
                            <div className='sizes'>38</div>
                            <div className='sizes'>39</div>
                            <div className='sizes'>40</div>
                            <div className='sizes'>41</div>
                            <div className='sizes'>42</div>
                            <div className='sizes'>43</div>
                            <div className='sizes'>44</div>
                            <div className='sizes'>45</div>
                        </div>
                    </div>
                    <div className='item col-lg-12'>
                        <h5 className='col-lg-12'>Color</h5>
                        <div className='content col-lg-12'>
                            <div className='color-item'><input class="form-check-input" type="checkbox"/>Black</div>
                            <div className='color-item'><input class="form-check-input" type="checkbox"/>White</div>
                            <div className='color-item'><input class="form-check-input" type="checkbox"/>Red</div>
                            <div className='color-item'><input class="form-check-input" type="checkbox"/>Blue</div>
                            <div className='color-item'><input class="form-check-input" type="checkbox"/>Organce</div>
                            <div className='color-item'><input class="form-check-input" type="checkbox"/>Pink</div>
                        </div>
                    </div>
                    <div className='item col-lg-12'>
                        <h5 className='col-lg-12'>Price</h5>
                        <div className='content col-lg-12'>
                            <div className='price-item'>$ &lt; 30</div>
                            <div className='price-item'>$ &lt; 50</div>
                            <div className='price-item'>$ &lt; 100</div>
                            <div className='price-item'>$ &lt; 200</div>
                            <div className='price-item'>$ &lt; 300</div>
                            <div className='price-item'>$ &gt; 300</div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-9 list-item'>
                    <div className='item'>

                    </div>
                    <div className='item'>
        
                    </div>
                    <div className='item'>
        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Categories;