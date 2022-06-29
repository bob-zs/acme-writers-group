import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Users from './Users';
import User from './User';


class App extends Component{
  constructor(){
    super();
    this.state = {
      users: [],
      userId: ''
    };
    this.destroyUser = this.destroyUser.bind(this);
  }
  async destroyUser(user){
    console.log('remove user');
    await axios.delete(`/api/users/${user.id}`);
    if(this.state.userId){
      window.location.hash = '';
    }
  }
  async destroyStory(story){
    console.log('remove story');
    await axios.delete(`/api/stories/${story.id}`);
    const storyEl = document.getElementById(story.id);
    storyEl.parentNode.removeChild(storyEl);
  }
  async componentDidMount(){
    try {
      console.log(this.props);
      const userId = window.location.hash.slice(1);
      this.setState({ userId });
      const response = await axios.get('/api/users');
      this.setState({ users: response.data });
      window.addEventListener('hashchange', ()=> {
      const userId = window.location.hash.slice(1);
      this.setState({ userId });
      });
    }
    catch(ex){
      console.log(ex);
    }

  }
  render(){
    const { users, userId } = this.state;
    const { destroyUser, destroyStory } = this;
    return (
      <div>
        <h1>Acme Writers Group ({ users.length })</h1>
        <main>
          <Users users = { users } userId={ userId } destroy = { destroyUser }/>
          {
            userId ? <User userId={ userId } destroy={ destroyStory } /> : null
          }
        </main>
      </div>
    );
  }
}

const root = document.querySelector('#root');
render(<App/>, root);


