import React, { Component } from 'react';
import uuid from 'uuid';
import $ from 'jquery';
import { Button, Intent, Navbar, NavbarGroup, NavbarDivider, NavbarHeading, Alignment, Collapse, FormGroup, MenuItem} from "@blueprintjs/core";
import { Table, Column, Cell} from "@blueprintjs/table";
import { Select } from "@blueprintjs/select";
import './App.css';



class App extends Component {
  constructor(){
    super();
    this.state = {
      projects: [],
      todos:[],
      isCollapseOpen: true,
    }
  }

  getTodos(){
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      dataType:'json',
      cache: false,
      success: function(data){
        this.setState({todos: data}, function(){
          console.log(this.state);
        });
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
      }
    });
  }

  getProjects(){
    this.setState({projects: [
      {
        id:uuid.v4(),
        title: 'Business Website',
        category: 'Web Design'
      },
      {
        id:uuid.v4(),
        title: 'Social App',
        category: 'Mobile Development'
      },
      {
        id:uuid.v4(),
        title: 'Ecommerce Shopping Cart',
        category: 'Web Development'
      }
    ]});
  }

  componentWillMount(){
    this.getProjects();
    this.getTodos();
  }

  componentDidMount(){
    this.getTodos();
  }

  handleOpenAddProject = () => {
        this.setState({ isCollapseOpen: !this.state.isCollapseOpen });
  }

  static defaultProps = {
    categories: ['Web Design', 'Web Development', 'Mobile Development']
  }


  render() {
    const cellRendererTitle = (rowIndex: number) => {
        return <Cell>{this.state.projects[rowIndex].title}</Cell>
    };

    const cellRendererCategory = (rowIndex: number) => {
        return <Cell>{this.state.projects[rowIndex].category}</Cell>
    };

    const CategorySelect = Select.ofType<Categories.Category>();

    return (
      <div className="App">
        <Navbar>
          <NavbarGroup align={Alignment.LEFT}>
              <NavbarHeading>Projectmanager</NavbarHeading>
              <input className="pt-input" placeholder="Search files..." type="text" />
          </NavbarGroup>
          <NavbarGroup align={Alignment.RIGHT}>
              <Button className="pt-minimal" icon="home" text="Home" />
              <Button className="pt-minimal" icon="document" text="Files" />
              <NavbarDivider />
              <Button className="pt-minimal" icon="user" />
              <Button className="pt-minimal" icon="notifications" />
              <Button className="pt-minimal"icon="cog" />
          </NavbarGroup>
        </Navbar>
        <div>
          <h1>Your Projects</h1>
          <Button intent={Intent.PRIMARY} icon="add" text='Add Project' onClick={this.handleOpenAddProject}/>
          <Collapse isOpen={this.state.isCollapseOpen}>
              <pre>
              <input className="pt-input .modifier" type="text" placeholder="Project" dir="auto" />
              <CategorySelect items={categoryOptions}/>
              </pre>
          </Collapse>
          <Table numRows={3}>
              <Column name="Title" cellRenderer={cellRendererTitle} />
              <Column name="Category" cellRenderer={cellRendererCategory}/>
          </Table>
        </div>

      </div>
    );
  }
}

export default App;
