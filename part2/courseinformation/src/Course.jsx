/* eslint-disable react/prop-types */

const Header = (props) =>  (<h1>{props.header}</h1> )

const Part = (props) =>{
    return (<li>
        {props.part.name} {props.part.exercises}
        </li>)
}

const Sum = (props) => {

    console.log(props)
}

const Content = (props) =>{
    console.log(props)
    const result = props.content.map(part => <Part key={part.id} part={part} />)
    return (<div>
        <ul>
            {result}
        </ul>
        </div>)

}

const Course = (props) =>{
    return (<div>
        <Header header={props.course.name}/>
        <Content content={props.course.parts} />
        <Sum content={props.course.parts} />
        </div>
    )
}

export default Course