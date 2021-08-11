// www/pages/login.js

import {Component} from 'react';
import API from '../helpers/api';
import logger from '../helpers/logger';
import {redirect} from '../utils/redirect';

class ListingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Radisson Hotel Suite in Brussels',
      description: 'The invoice details should come here.',
      price: 10000,
      location: 'Belgium',
      currency: 'EUR',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    try {
      await API.makeRequest('post', `/api/listings/new`, {
        ...this.state,
        ...this.state.price ? {price: Number(this.state.price.toString().replace(",", ".")) * 100} : {}
      });
      return redirect('/dashboard/host');
    } catch (err) {
      logger.log('Signup failed.', err);
    }
  }

  render() {
    return (
      <>
        <div className="listing-form">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                className="form-control"
                type="text"
                id="title"
                name="title"
                placeholder="Radisson Hotel Suite in Brussels"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                placeholder="Radisson Hotel Suite in Brussels"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Invoice price</label>
              <input
                className="form-control"
                type="text"
                id="price"
                name="price"
                placeholder="10000 USD"
                value={this.state.price}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="currency">Currency</label>
              <select
                id="currency"
                className="form-control"
                name="currency"
                value={this.state.currency}
                onChange={this.handleChange}
              >
                <option>USD</option>
                <option>EUR</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                className="form-control"
                id="location"
                name="location"
                placeholder="Mexico"
                value={this.state.location}
                onChange={this.handleChange}
              />
            </div>

            <button type="submit" className="btn-submit btn btn-primary">
              Create
            </button>

            <p className={`error ${this.state.error && 'show'}`}>
              {this.state.error && `Error: ${this.state.error}`}
            </p>
          </form>
        </div>
        <style jsx>{`
          .listing-form {
            margin: 0;
            padding: 20px 0 0;
          }

          label {
            font-weight: 600;
          }

          input {
            padding-left: 12px;
          }

          .error {
            margin: 0.5rem 0 0;
            display: none;
            color: brown;
          }
          .error.show {
            display: block;
          }

          .btn-submit {
            margin-top: 20px;
          }
        `}</style>
      </>
    );
  }
}

export default ListingForm;
