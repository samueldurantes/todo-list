<template>
    <div class="content">
        <div class="head">
            <div class="title">My Tasks</div>
            <ul>
                <li><a href="#" :class="{ active: category === 'all' }" @click="category = 'all'">All</a></li>
                <li><a href="#" :class="{ active: category === 'completed' }" @click="category = 'completed'">Completed</a></li>
                <li><a href="#" :class="{ active: category === 'incompleted' }" @click="category = 'incompleted'">Incomplete</a></li>
            </ul>
        </div>
        <div class="search">
            <input v-model="searchTerm" type="text" placeholder="Search/create task" @keyup.enter.exact="addTodo">
        </div>
        <div class="lists">
            <div class="list">
                <div class="title">{{ resolveListTitle }}</div>
                <ul v-if="filteredTodos.length">
                    <li v-for="(todo, index) in filteredTodos">
                        <div class="todo">{{ todo.task }}</div>
                        <a href="#" @click="completeTodo(todo)">{{ resolveButtonValue(todo) }}</a>
                    </li>
                </ul>
                <div v-else class="no-results">No tasks found...</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { v4 as uuidv4 } from 'uuid'

    export default {
        name: 'Search',
        data() {
            return {
                searchTerm: '',
                todos: [],
                category: 'all'
            }
        },

        mounted() {
            if (localStorage.getItem('todos')) {
                try {
                    this.todos = JSON.parse(localStorage.getItem('todos'))
                } catch (error) {
                    localStorage.removeItem('todos')
                }
            }
        },

        methods: {
            addTodo() {
                if (this.searchTerm) {
                    this.todos.push({
                        id: uuidv4(),
                        task: this.searchTerm,
                        done: false
                    })
                    this.searchTerm = ''
                }
            },

            completeTodo(todo) {
                const indexTodo = _.findIndex(this.todos, item => {
                    return todo.id === item.id
                })

                if (indexTodo >= 0) {
                    this.todos[indexTodo].done = !todo.done
                }
            },

            removeTodo(index) {
                this.todos.splice(index, 1)
            },

            resolveButtonValue(todo) {
                return todo.done ? 'Complete' : 'To complete'
            }
        },

        watch: {
            todos(newTodos) {
                localStorage.setItem('todos', JSON.stringify(newTodos))
            }
        },

        computed: {
            resolveListTitle() {
                switch (this.category){
                    case "completed":
                        return 'Complete tasks'
                    case "incompleted":
                        return 'Incomplete tasks'
                    default:
                        return 'All tasks'
                }
            },

            filteredTodos() {
                let todos = this.todos

                if (this.category === 'completed') {
                    todos = _.filter(todos, todo => todo.done)
                } else if (this.category === 'incompleted') {
                    todos = _.filter(todos, todo => !todo.done)
                }

                const search = this.searchTerm.toLowerCase()

                return todos.filter((todo) => {
                    return  ASCIIFolder.foldMaintaining(JSON.stringify(todo)).includes(search)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .content {
        background: #F8F8F8;
        border-radius: 6px;
        width: 100%;
        max-width: 550px;
        margin: 0 auto;
        box-shadow: 0 3px 6px 0 rgba(#000, .2);

        & > .head {
            display: flex;
            align-items: center;
            padding: 20px 30px;
            border-bottom: 1px solid #CECECE;

            & > .title {
                font-size: 22px;
                font-weight: 500;
                color: #707070;
                margin-right: auto;
            }

            ul {
                display: flex;
                align-items: center;

                li {
                    a {
                        border: 1px solid #CECECE;
                        border-radius: 4px;
                        font-size: 12px;
                        font-weight: 700;
                        padding: 5px 10px;
                        color: #707070;
                        transition: .4s;

                        &:hover {
                            border: 1px solid #058CFF;
                            color: #058CFF;
                        }

                        &.active {
                            border: 1px solid #058CFF;
                            background: #058CFF;
                            color: #FFF;
                        }
                    }

                    &:not(:last-child) {
                        margin-right: 10px;
                    }
                }
            }
        }

        & > .search {
            display: flex;
            align-items: center;
            width: 100%;
            height: 56px;
            max-width: 550px;
            padding: 8px 30px;
            border-bottom: 1px solid #CECECE;

            input {
                border: 1px solid #CECECE;
                border-radius: 4px;
                padding: 8px 15px;
                width: 100%;
                font-family: 'Roboto', sans-serif;
                font-size: 16px;
                font-weight: 400;
                color: #707070;
                transition: .6s;

                &::placeholder {
                    color: rgba(#707070, .59);
                }

                &:focus {
                    border: 1px solid #058CFF;
                }
            }
        }

        & > .lists {
            .list {
                .title {
                    padding: 15px 30px;
                    font-size: 18px;
                    font-weight: 500;
                    color: #707070;
                    border-bottom: 1px solid #CECECE;
                }

                ul {
                    li {
                        display: flex;
                        align-items: center;
                        border-bottom: 1px solid #CECECE;
                        padding: 15px 30px;

                        .todo {
                            font-size: 18px;
                            font-weight: 400;
                            color: #707070;
                        }

                        a {
                            border: 1px solid #CECECE;
                            border-radius: 4px;
                            font-size: 12px;
                            font-weight: 700;
                            padding: 5px 10px;
                            color: #707070;
                            transition: .4s;
                            margin-left: auto;

                            &:hover {
                                border: 1px solid #058CFF;
                                color: #058CFF;
                            }
                        }
                    }
                }

                .no-results {
                    font-size: 16px;
                    font-weight: 400;
                    color: rgba(#707070, .8);
                    padding: 15px 30px;
                }
            }
        }
    }
</style>