/* eslint-disable react/prop-types */

const Header = (props) =>  (<h1>{props.header}</h1> )

const Part = (props) =>{
    return (<div>
        {props.part.name} {props.part.exercises}
        </div>)
}

const Sum = (props) => {

    const sum = props.content.reduce((sum, part) => (sum + part.exercises), 0)
    return (<div><b>Total of {sum} exercises</b></div>)
}

const Content = (props) =>{
    const result = props.content.map(part => <Part key={part.id} part={part} />)
    return (<div>
        
            {result}
        
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