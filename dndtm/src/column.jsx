import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from './task';

const SecondContainer = styled.div`
  padding: 20px;
  border: 4px solid black;
  border-radius: 6px;
  height: 200px;
  overflow-y: scroll;
`;

const FirstContainer = styled.div`
  padding: 20px;
  border: 4px solid black;
  border-radius: 6px;
  height: 100px;
  overflow-y: scroll;
`;


const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`;

export default class Column extends React.Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (

            <SecondContainer>
              <FirstContainer>



                <TaskList
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {this.props.tasks.map((task, index) => (
                    <Task key={task.id} task={task} index={index} />
                  ))}
                  {provided.placeholder}
                </TaskList>

                </FirstContainer>

            <div>Tarun</div>
            <div>Tarun</div>
            <div>Tarun</div>
            <div>Tarun</div>
            <div>Tarun</div>
            <div>Tarun</div>
            <div>Tarun</div>
            <div>Tarun</div>

            </SecondContainer>

          )}
              </Droppable>
            </Container>
          );
  }
}