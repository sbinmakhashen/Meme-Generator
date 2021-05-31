import React, { Component } from 'react';

class MemeGenerator extends Component {
  state = {
    topTxt: '',
    bottomTxt: '',
    memeImg: 'https://i.redd.it/iy0mnp8ofcu51.png',
    memeRandom: [],
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    fetch('https://api.imgflip.com/get_memes')
      .then((res) => res.json())
      .then((response) => {
        this.setState({ memeRandom: response.data.memes });
      });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const randomNum = Math.floor(Math.random() * this.state.memeRandom.length);
    const randomImgg = this.state.memeRandom[randomNum].url;
    this.setState({ memeImg: randomImgg });
  };

  render() {
    console.log(this.state.memeRandom);
    return (
      <div>
        <form className='meme-form' onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='topTxt'
            placeholder='Top text'
            onChange={this.handleChange}
            value={this.state.topTxt}
          />

          <input
            type='text'
            name='bottomTxt'
            placeholder='Bottom text'
            onChange={this.handleChange}
            value={this.state.bottomTxt}
          />
          <div>
            <button type='submit' className='btn'>
              Generate
            </button>
          </div>
        </form>
        <div className='meme'>
          <h2 className='top'>{this.state.topTxt}</h2>
          <h2 className='bottom'>{this.state.bottomTxt}</h2>
          <img src={this.state.memeImg} alt='' />
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
