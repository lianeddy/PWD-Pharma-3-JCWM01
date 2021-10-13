import React from 'react';
import Axios from 'axios';
import ProductCard from "../template-components/Card/ProductCard";
//@mui/icon
import Search from "@material-ui/icons/Search";
//@mui/material
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
//@material-ui/core components
import GridItem from "../template-components/Grid/GridItem.js";
import GridContainer from "../template-components/Grid/GridContainer.js";
import CustomButtons from "../template-components/CustomButtons/Button";

class Home extends React.Component{

  state = {
    productList: [],
    filterProductList:[],
    page:1,
    maxPage:0,
    itemPerPage:3,
    searchProductName:"",
    searchCategory:"",
    sortBy:"",
  }
  fetchProducts = () => {
    Axios.get("http://localhost:3300/products/getData")
    .then((result) => {
    alert("Berhasil") 
    this.setState({ productList: result.data, maxPage:Math.ceil(result.data.length/this.state.itemPerPage), filterProductList:result.data})
    })
    .catch(() => {
    alert("Terjadi kesalahan di server")
    })
  }
  renderProducts = () => { 
    console.log("render")
    const beginningIndex =(this.state.page -1)*this.state.itemPerPage
    const compareString =(a,b)=>{
      if(a.productName < b.productName){
        return -1;
      }
      if(a.productName > b.productName){
        return 1;
      }
      return 0;
    }
    let rawData = [...this.state.filterProductList]
    switch (this.state.sortBy){
      case "lowestPrice":
        rawData.sort((a,b)=> a.price - b.price);
        break
        case "highestPrice":
          rawData.sort((a,b)=> b.price - a.price);
        break
        case "az":
          rawData.sort(compareString);
        break
        case "za":
          rawData.sort((a,b)=>compareString(b,a));
        break
      default:
        rawData = [...this.state.filterProductList];
        break
    }
    const currentData = rawData.slice(beginningIndex, beginningIndex+this.state.itemPerPage)
    return currentData.map((val) => {
      console.log("tes")
      return <ProductCard productData={val}/> 

    })
  }
  nextPageHandler =()=>{
    
    if(this.state.page < this.state.maxPage){
      this.setState({page:this.state.page+1})
    }
    
  }
 
  previousPageHandler =()=>{
    if(this.state.page >1 ){
    this.setState({page:this.state.page-1})
    }
  }
  inputHandler =(event)=>{
    const name = event.target.name
    const value = event.target.value
    this.setState({ [name] : value })
  }
  searchBtnHandler = ()=>{
    const filterProductList = this.state.productList.filter((val)=>{
      return val.productName.toLowerCase().includes(this.state.searchProductName.toLowerCase()) && val.category_id.includes(this.state.searchCategory.toLowerCase());
    })
    
    this.setState({ filterProductList,  maxPage:Math.ceil(filterProductList.length/this.state.itemPerPage), page:1 })
  }
  componentDidMount() {
    this.fetchProducts();
  }
  render(){
    return(
        <div>
             <GridItem xs={12} sm={6} md={4}>
             <InputLabel htmlFor="standard-adornment-amount">Cari Katalog Obat</InputLabel>
                <Input
                    // id="standard-adornment-amount"
                    // value={values.amount}
                    onChange={this.inputHandler}
                    startAdornment={<InputAdornment position="end"><Search/></InputAdornment>}
                />
                    
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
                <FormControl variant="standard">
                    <InputLabel>Filter Kategori</InputLabel>
                    <Select
                    //labelId="demo-simple-select-standard-label"
                    //id="demo-simple-select-standard"
                    //value={age}
                    onChange={this.inputHandler}
                    label="Pilih Jenis Obat"
                    >
                    <MenuItem value="">
                        <em>Default</em>
                    </MenuItem>
                    <MenuItem value="1">Obat Umum</MenuItem>
                    <MenuItem value="2">Obat Bebas Terbatas</MenuItem>
                    <MenuItem value="3">Obat Keras</MenuItem>
                    <MenuItem value="4">Obat Golongan Narkotik</MenuItem>
                    <MenuItem value="5">Obat Fitofarmaka</MenuItem>
                    <MenuItem value="6">Obat Herbal Terstandar (OHT)</MenuItem>
                    <MenuItem value="7">Obat Herbal (Jamu)</MenuItem>
                    </Select>
                </FormControl>
                    
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
                <FormControl variant="standard" >
                    <InputLabel id="demo-simple-select-standard-label">Urutkan Produk</InputLabel>
                    <Select
                    //labelId="demo-simple-select-standard-label"
                    //id="demo-simple-select-standard"
                    //value={age}
                    onChange={this.inputHandler}
                    label="Urutkan Produk"
                    >
                    <MenuItem value="">
                        <em>Default</em>
                    </MenuItem>
                    <MenuItem value="lowestPrice">Harga Terendah</MenuItem>
                    <MenuItem value="highestPrice">Harga Tertinngi</MenuItem>
                    <MenuItem value="az">A-Z</MenuItem>
                    <MenuItem value="za">z-A</MenuItem>
                    </Select>
                </FormControl>
                    
            </GridItem>

            {/* <GridItem xs={12} sm={6} md={3}>
           
                    
           </GridItem> */}
            <GridItem xs={12} sm={6} md={2}>
            <CustomButtons color="info" size="md" onClick={this.searchBtnHandler} ><Search/> </CustomButtons >
                    
            </GridItem>
            <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
            {this.renderProducts()}
            </GridItem>
       
            </GridContainer>
            <GridContainer>
            <GridItem xs={12} sm={8} md={8}>
                <ButtonGroup  variant="contained" aria-label="outlined info button group">
                        <Button color="info" disabled={this.state.page === 1} onClick={this.previousPageHandler} >{"<"}</Button>
                        <Button color="info" variant="outlined"  aria-label="outlined"> {this.state.page} dari {this.state.maxPage} Halaman</Button>
                        <Button  color="info" disabled={this.state.page === this.state.maxPage} onClick={this.nextPageHandler}>{">"}</Button>
                </ButtonGroup>
            </GridItem>
            </GridContainer>
        </div>
     
        
     

    )
  }
}


export default Home;