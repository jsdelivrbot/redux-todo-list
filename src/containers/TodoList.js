import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled, { keyframes } from 'styled-components'

import { toggleCompleted } from '../actions/index'

class TodoList extends Component {
    // Will filter todos array by app state filter on this.props
    getTodosByFilter(todos, filter) {
        switch (filter) {
            case 'DISPLAY_ALL':
                return todos
            case 'DISPLAY_COMPLETED':
                return todos.filter(todo => todo.completed === true)
            case 'DISPLAY_NOT_COMPLETED':
                return todos.filter(todo => todo.completed === false)
        }
    }

    render() {
        const visibleTodos = this.getTodosByFilter(this.props.todos, this.props.filter)

        return (
            <div>
                <ol>
                    {visibleTodos.map(todo => {
                        return (
                            <Li
                                key={todo.id}
                                onClick={() => this.props.toggleCompleted(todo.id)}
                                activateStyling={todo.completed}
                                onMouseDown={e => e.preventDefault()}>
                                {todo.text}
                            </Li>
                        )
                    })}
                </ol>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    todos: state.todos,
    filter: state.filter
})

const mapDispatchToProps = dispatch => (bindActionCreators({ toggleCompleted }, dispatch))


export default connect(mapStateToProps, mapDispatchToProps)(TodoList)

// Styled-components
const slideInFromRight = keyframes`
  from {
    transform: translateX(10px);
    opacity: 0
  }

  to {
    transform: translateX(0px);
    opacity: 1
  }
`;

const Li = styled.li`
    margin-top: 10px
    font-size: 18px
    text-decoration: ${props => props.activateStyling ? 'line-through' : 'none'}
    color: ${props => props.activateStyling ? 'grey' : 'default'};
    animation: ${slideInFromRight} 0.4s ease;

    &:hover {
        cursor: pointer
    }
`