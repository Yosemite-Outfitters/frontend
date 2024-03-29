import React, { Component } from 'react';

import RelatedProductsList from './RelatedProductsList.jsx';
import Comparison from './Comparison.jsx';
import Outfit from './Outfit.jsx';

import { getRelatedProducts } from  '../../requests.js';
import { getProductById } from  '../../requests.js';

class RelatedItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productsList: [],
            finished: false
        };
        this.refreshProductsList = this.refreshProductsList.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    refreshProductsList() {
        getRelatedProducts(this.props.productId)
        .then(idsArray => {
            let ids = [...new Set(idsArray.data)];
            this.setState({
                productsList: ids,
                finished: false,
                show: false,
                modal_product: null,
                current_product: null
            }, () => {
                this.setState({
                    finished: true
                });
            });4
        });
    }

    showModal(product) {
        this.getCurrentProduct(product);
    }

    hideModal(e) {
        this.setState({ show: false });
        this.props.interact(e.target.outerHTML);
    }

    getCurrentProduct(product) {
        getProductById(this.props.productId)
        .then(currentProduct => {
            this.setState ({
                current_product: currentProduct.data,
                show: true,
                modal_product: (product)
            });
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.productId !== this.props.productId) {
            this.refreshProductsList();
        }
    }

    componentDidMount() {
        this.refreshProductsList();
    }

    render() {
        return (
            <div id="related-items">
                {
                this.state.show ?
                <Comparison modal_product={JSON.stringify(this.state.modal_product)} current_product={JSON.stringify(this.state.current_product)} hideModal={this.hideModal} interact={this.props.interact} />
                :
                null
                }
                {
                this.state.finished ?
                <div>
                <h2 id="carousel-header">Related Products</h2>
                <RelatedProductsList productId={this.props.productId} productsList={this.state.productsList} showModal={this.showModal} updateCurrentProduct={this.props.updateCurrentProduct} interact={this.props.interact} toTop={this.props.toTop} />
                <h2 id="carousel-header">My Outfit</h2>
                <Outfit productId={this.props.productId} interact={this.props.interact} updateCurrentProduct={this.props.updateCurrentProduct} addCurrentToOutfits={this.props.addCurrentToOutfits} removeFromOutfit={this.props.removeFromOutfit} outfits_list={[0, ...this.props.outfits_list]} toTop={this.props.toTop} />
                </div>
                :
                <h1>Loading</h1>
                }
            </div>
        );
    }
}

export default RelatedItems;