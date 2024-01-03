import { Component } from "react";
import Contacts from "./Contscts/Contacts";
import ContactList from "./ContactList/ContactList";
import FormContact from "./FormContact/FormContact";


class App extends Component {

  state = {
    contacts: [],
    filter: '',
  }


  componentDidMount() {
    console.log(this.state);
    if (localStorage.getItem("contacts")) {
      this.setState({
        contacts: JSON.parse(localStorage.getItem('contacts'))
      })
    }
  }
  componentDidUpdate(_, state) {
    if (state !== JSON.parse(localStorage.getItem('contacts'))) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
    }
  }


  contactFilter = ({ name }) => {
    this.setState(() => {
      return {
        filter: name,
      }
    })
  }



  createUser = (data) => {
    if (this.state.contacts.some(item => item.name.toLowerCase() === data.name.toLowerCase())) {
      alert(`${data.name} is already in contacts`)
    } else {

      this.setState(prevState => (
        { contacts: [...prevState.contacts, data] }
      ));
    }
  }

  delete = (nameDel) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== nameDel),
    }));
  }

  render() {
    const filterArr = this.state.contacts.filter(item => item.name.toLowerCase().includes(this.state.filter.toLowerCase()))

    return (
      <>
        <FormContact createUser={this.createUser} />
        <Contacts contactFilter={this.contactFilter} />
        {this.state.contacts.length !== 0 &&
          <ContactList delete={this.delete}
            filter={filterArr} />}
      </>
    );
  }
};

export default App 