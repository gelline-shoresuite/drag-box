import React from 'react';
import './App2.css'

//Don't remove any old codes? but I can add more.

const Item = ({ color, id, text, name, onDragStartHandler}) => (
  <section className="item" style={{
      backgroundColor: color,
    }}
    
    draggable

    onDragStart={onDragStartHandler}


    key={id}
    id={name}
    >
    <span>{text}</span>
  </section>
);

const getItems = (basketItems, items) => basketItems.map(basketItem =>
  items.filter(item => basketItem === item.name)[0]                                  
)

const Basket = ({name, items , onDropHandler, onDragOverHandler, onDragStartHandler, onClickHandler})  => (
  <article className="basket"
    key={name}

    onDrop={onDropHandler}
    onDragOver={onDragOverHandler}
    >
    {items.map((item, index) => (
      <Item 
        {...item}
        onDragStartHandler={onDragStartHandler}
        onClickHandler={onClickHandler}
        key={'item' + index}
        />
      ))}
  </article>
);

class App extends React.Component {

  state = {
    baskets: [
      {
        name: "basket1",
        items: [
          "indigo",
          "red",
        ]
      },
      {
        name: "basket2",
        items: [
          "deeporange",
        ]
      },
      {
        name: "basket3",
        items: [
          "cyan","blue"
        ]
      },
    ],
    items: [
      {
        name: "indigo",
        color: "#3f51b5",
        text: "Indigo"
      },
      {
        name: "deeporange",
        color: "#ff5722",
        text: "Deep Orange"
      },
      {
        name: "red",
        color: "#f44336",
        text: "Red"
      },
      {
        name: "cyan",
        color: "#00bcd4",
        text: "Cyan"
      },
      {
        name: "blue",
        color: "blue",
        text: "Blue"
      },
    ],


  }

  handleOnDragStart = (event, firstId) =>{
    const id = event.target.id;

    console.log('Drag: ', id);
    console.log('First ID: ' , firstId);

    event.dataTransfer.setData('id', id);
    event.dataTransfer.setData('firstId', firstId);
  }

  handleOnDrop = (event, i) =>{
    const id = event.dataTransfer.getData('id');
    const firstId = event.dataTransfer.getData('firstId');

    if(firstId != i){

      const baskets = this.state.baskets.map((basket, index) =>{
        console.log('Initial basket ' + index, basket.items);
        if(index == firstId){
          basket.items =  basket.items.filter((item)=>{
            return(item !== id);
          })
        }
        if(index === i){
          basket.items = basket.items.concat(id);
        }
       
        return basket;
      })

      console.log(baskets)

      this.setState({
        baskets: baskets
      })

    }else{
      console.log('No')
    }

    
  }

  handleOnDragOver = (event) =>{
    event.preventDefault();
  }


  render() {
    const {
      baskets,
      items,
    } = this.state;

    return ( 
      <div className="app">
        <div className="basket-container">
          {baskets.map((basket, index) => (
            <Basket
              items={getItems(basket.items, items)}
              listkey={basket.name}

              onDragStartHandler={(event) => this.handleOnDragStart(event, index)}
              onDropHandler={(event) => this.handleOnDrop(event, index)}
              onDragOverHandler={this.handleOnDragOver}

              key={index}
              />
          ))}
        </div>
      </div>
    );
  }
}

export default App;