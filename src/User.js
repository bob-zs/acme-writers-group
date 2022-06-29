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
  async toggleFavorite(story) {
    const storyId = story.id;
    const response = await axios.put(`/api/stories/favorite/${storyId}`);
    if (response.status !== 204) throw `Failed to toggle favorite status of storyId ${storyId}`;
    
  }
  render(){
    const { user, stories, destroy } = this.state;
    const toggleFavorite = this.toggleFavorite;
    return (
      <div>
        Details for { user.name }
        <p>
          { user.bio }
        </p>
        <ul className="storyList">
          {
            stories.map( story => {
              const isFav = story.favorite;
              return (
                <li key={ story.id } id={ story.id }>
                  { isFav ? '🟢': null }&nbsp;
                  { story.title }
                  <button onClick={()=> destroy(story)}>x</button>
                  <p>
                  { story.body }
                </p>
                <p>
                    <button onClick={ () => toggleFavorite(story) } className={ isFav ? 'notFav' : 'fav' }>
                      { isFav ? 'unfavorite': 'Make Favorite' }
                    </button>
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
