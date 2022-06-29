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

  async handleSubmit(ev) {
    ev.preventDefault();
    console.log('handling submit')

  }

  render(){
    const { user, stories, destroy } = this.state;
    const userId = user.id;
    return (
      <div>
        Details for { user.name }
        <p>
          { user.bio }
        </p>
        <form onSubmit={ () => handleSubmit() }>
          {/* <input name="storyTitle" value='Story Title'></input>
          <textarea name="storyDesc" value='Story Description'></textarea> */}
          <input name="userId" value={ userId }  />
          <input type="submit" value="Submit"/>
        </form>
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
