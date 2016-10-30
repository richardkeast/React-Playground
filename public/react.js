var Note = React.createClass (
{
    getInitialState()
    {
        return {editing: false};
    },

    edit()
    {
        this.setState({editing: true});
    },

    save()
    {
        var val = this.refs.newText.value;
        this.setState({editing: false});
    },

    remove()
    {
        alert("Removing Note");
    },

    renderForm()
    {
        return (
            <div className="note">
                <textarea ref="newText"></textarea>
                <button onClick={this.save}>SAVE</button>
            </div>
        )
    },

    renderDispaly()
    {
        return (
             <div className="note">
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit}>EDIT</button>
                    <button onClick={this.remove}>x</button>
                </span>
            </div>)
    },

    render()
    {
        if (this.state.editing)
        {
            return this.renderForm();
        }
        else
        {
            return this.renderDispaly();
        }
    }
});

var Board = React.createClass({
    propTypes: 
    {
        count: function(props, propName)
        {
            if (typeof props[propName] !== "number")
            {
                return new Error("The count must be a number");
            }
            if (props[propName] > 100)
            {
                return new Error("Creating " + props[propName] + " notes is stupid");
            }
        }
    },

    getInitialState()
    {
        return {
            notes: 
            [
                "Call Bob",
                "Email Sarah",
                "Eat Lunch",
                "Finish Proposal"
            ]
        }
    },

    render()
    {
        return (
        <div className="board">
            {this.state.notes.map((note, i) => {
                return <Note key={i}>{note}</Note>
            })}
        </div>)
    }
});

ReactDOM.render(<Board count={10} />, document.getElementById('react-container'));