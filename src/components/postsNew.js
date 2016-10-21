import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { createPost } from '../actions/index'
import { Link } from 'react-router'

class PostsNew extends Component{

  static contextTypes = {
    router: PropTypes.object
  }
  //to get access to react router
  //defining an obj on the postsnew class
  //postsnew.context will return the obj above

  onSubmit(props){
    this.props.createPost(props)
      .then(()=>{
        //blog post successfully created, navigate to home page
        this.context.router.push('/')
      })
    // pulled out createPost from handleSubmit because adding the below
    // promise as payload
    // run the dot then whenever promise is resolved
  }

  render(){
    const {
      fields:{title, categories, content},
      // same as this.props.fields.title
    handleSubmit
    } = this.props

    console.log(title.value, categories.value, content.value)
    // context is like props,
    // but doesnt have to be specifically passed from parent to child
    // only use it for router!

    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
      //will call the action with the values of the form
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger':''}`}>
          <label>Title</label>
          <input type='text' className='form-control' {...title}/>
          <div className='text-help'>
          {title.touched ? title.error:''}
          </div>
        </div>
        <div className='form-group'>
          <label>Categories</label>
          <input type='text' className='form-control' {...categories}/>
        </div>
        <div className='form-group'>
          <label>Content</label>
          <textarea className='form-control' {...content}/>
          <div className='text-help'>
          {content.touched ? content.error:''}
          </div>
        </div>
        <button type='submit' className='btn btn-primary'>
          submit
        </button>
        <Link to='/' className='btn btn-danger'>Cancel</Link>
      </form>
    )
  }
}

function validate(values){
  const errors = {}
  if (!values.title){
    errors.title = 'Enter a username'
  }
  if (!values.content){
    errors.content = 'Enter content'
  }
  return errors
  // if this has a key that matches field names
}

export default reduxForm({
  //injects into this.props
  //also handleSubmit
  form: 'PostsNewForm', // form name, doenst need to match
  fields: ['title', 'categories', 'content'],
  validate
  //configuration
  //setting new value to the global state
  // state is going to have a
  //state ==={form: {}}
}, null, {createPost})(PostsNew)

//^ this is very similar to connect
// connect: first arg is mapstate, second is mapDispatchToProps
// reduxForm: first is form config, second is mapstate, third is mapDispatchToProps
