import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "grey",
  ...draggableStyle
  
});

const getListStyle = (isDraggingOver,index) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
  maxHeight:300,
  overflow: "auto",
  margin:10,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [this.getItems(10), this.getItems(5, 10), this.getItems(10, 15), this.getItems(10, 25), this.getItems(5, 35), this.getItems(10, 40), this.getItems(10, 50)]
    };
  }

  getItems(count, offset = 0) {
    return Array.from({ length: count }, (_, k) => ({
      id: `item-${k + offset}-${new Date().getTime()}`,
      content: `item ${k + offset}`
    }));
  }

  reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  move(source, destination, droppableSource, droppableDestination) {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  }

  onDragEnd = result => {
    const { source, destination } = result;
  
    // dropped outside the list
    if (!destination) {
      return;
    }
  
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;
  
    if (sInd === dInd) {
      const items = this.reorder(
        this.state.groups[sInd],
        source.index,
        destination.index
      );
      const newState = { groups: [...this.state.groups] };
      newState.groups[sInd] = items;
      this.setState(newState);
    } else {
      const result = this.move(
        this.state.groups[sInd],
        this.state.groups[dInd],
        source,
        destination
      );
      const newState = { groups: [...this.state.groups] };
      newState.groups[sInd] = result[sInd];
      newState.groups[dInd] = result[dInd];
  
      // Remove empty groups
      newState.groups = newState.groups.filter(group => group.length > 0);
  
      this.setState(newState);
    }
  };
  

  render() {
    return (
      <div style={{width:"100%"}}>
        <button
          type="button"
          onClick={() => {
            this.setState(prevState => ({
              groups: [...prevState.groups, []]
            }));
          }}
        >
          Add new group
        </button>
        <button
          type="button"
          onClick={() => {
            this.setState(prevState => ({
              groups: [...prevState.groups, this.getItems(1)]
            }));
          }}
        >
          Add new item
        </button>
        <div className="container" style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", width:"90%",paddingRight:"100px", maxHeight:"600px", overflow:"auto"}}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            {this.state.groups.map((el, ind) => (
              <Droppable key={ind} droppableId={`${ind}`}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver,ind)}
                    {...provided.droppableProps}
                  >
                    {el.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-around"
                              }}
                            >
                              {item.content}
                              <button
                                type="button"
                                onClick={() => {
                                  const newState = { groups: [...this.state.groups] };
                                  newState.groups[ind].splice(index, 1);
                                  this.setState(
                                    newState.filter(group => group.length)
                                  );
                                }}
                              >
                                delete
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        </div>
      </div>
    );
  }
}

export default App;
