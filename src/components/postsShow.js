import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPost, deletePost } from '../actions/index'
import { Link } from 'react-router'
class PostsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount(){
    this.props.fetchPost(this.props.params.id)
  }

  handleDelete(event){
    console.log('deleting')
    this.props.deletePost(this.props.post.id)
      .then(()=>{
        //blog post successfully created, navigate to home page
        this.context.router.push('/')
      })
  }

    render(){
      const  {post} = this.props

      if (!post){
        return <div>LOADING ...</div>
      }
      console.log(post)

      return(
        <div>
        <Link to='/'> Back to Index</Link>
        <h3>{post.title}</h3>
        <h6>{post.content}</h6>
        <button
          onClick={this.handleDelete.bind(this)}
          className='btn btn-primary pull-xs-right'>
          delete
        </button>
        </div>
      )
    }
}

function mapStateToProps(state){
  return { post : state.posts.post}
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow)

// this.props.params is the url request
