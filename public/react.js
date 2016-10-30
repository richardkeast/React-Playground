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
        this.props.onChange(this.refs.newText.value, this.props.id);
        this.setState({editing: false});
    },

    remove()
    {
        this.props.onRemove(this.props.id);
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
            notes: [
            ]
        }
    },

    nextId()
    {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    },

    add(text){
        var notes = [
            ...this.state.notes,
            {
                id: this.nextId(),
                note: text
            }
        ]

        this.setState(({notes}));
    },

    update(newText, id) {
        var notes = this.state.notes.map(
            note => (note.id !== id) ?
                note :
                    {
                      ...note,
                      note: newText
                    }
        )
        
        this.setState({notes});
    },


    remove(id)
    {
        var notes = this.state.notes.filter(note => note.id !== id)
        this.setState({notes});
    },

    eachNote(note)
    {
        return (<Note key={note.id} 
                      id={note.id}
                      onChange={this.update}
                      onRemove={this.remove}>
                    {note.note}</Note>)
    },

    render()
    {
        return (
        <div className="board">
            {this.state.notes.map(this.eachNote)}
            <button onClick={() => this.add()}>+</button>
        </div>)
    }
});

ReactDOM.render(<Board count={10} />, document.getElementById('react-container'));