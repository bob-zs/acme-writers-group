import React, { Component } from 'react';
import axios from 'axios';

class User extends Component{
  constructor(){
    super();
    this.state = {
      user: {},
      stories: [],
      destroy: null,
    };
  }
  async componentDidMount(){
    let response = await axios.get(`/api/users/${this.props.userId}`);
    this.setState({ user: response.data });
    response = await axios.get(`/api/users/${this.props.userId}/stories`);
    this.setState({ stories: response.data });
    this.setState({ destroy: this.props.destroy });
  }
  async componentDidUpdate(prevProps){
    if(prevProps.userId !== this.props.userId){
      let response = await axios.get(`/api/users/${this.props.userId}`);
      this.setState({ user: response.data });
      response = await axios.get(`/api/users/${this.props.userId}/stories`);
      this.setState({ stories: response.data });
      
    }
  }
  render(){
    const { user, stories, destroy } = this.state;
    return (
      <div>
        Details for { user.name }
        <p>
          { user.bio }
        </p>
        <ul>
          {
            stories.map( story => {
              return (
                <li key={ story.id } id={ story.id }>
                  { story.title }
                  <button onClick={()=> destroy(story)}>x</button>
                  <p>
                  { story.body }
                  </p>
                </li>

              );
            })
          }
        </ul>
      </div>
    );
  }
}



export default User;
