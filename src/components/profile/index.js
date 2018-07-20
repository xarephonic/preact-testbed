import { h, Component } from 'preact';
import style from './style.less';
import axios from 'axios';

export default class Profile extends Component {
	state = {};
	componentDidMount() {
		axios.get(`http://localhost:8090/${this.props.user}`)
			.then(resp => {
				this.setState({
					...resp.data
				})
			});
	}

	componentWillReceiveProps(nextprops) {
		axios.get(`http://localhost:8090/${nextprops.user}`)
			.then(resp => {
				this.setState({
					...resp.data
				});
			});
	}

	render() {
		return (
			<div class={style.profile}>
				<h1>{this.state.name}</h1>
				{ this.state.images && ( <img src={this.state.images[1].url}/>)}
				{ this.state.genres && (
					<ul>
						{this.state.genres.map(genre => {
							return (<li>{genre}</li>)
						})}
					</ul>
				)}
				{ this.state.followers && (
					<p>Followers: {this.state.followers.total}</p>
					)
				}
			</div>
		);
	}
}
