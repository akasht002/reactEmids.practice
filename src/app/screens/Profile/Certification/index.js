import React from 'react';
import { Input } from '../../../components';

export default class Certification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <form className="form my-2 my-lg-0">
                <div className="row">
                    <div className="col-md-12 mb-2">
                        <Input
                            name="Certification"
                            label="Certification"
                            autoComplete="off"
                            required="required"
                            type="text"
                            placeholder="e.g. Home Care Aide Organization"
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-12 mb-2">
                        <Input
                            name="CertificationAuthority"
                            label="Certification Authority"
                            autoComplete="off"
                            required="required"
                            type="text"
                            placeholder="e.g. California Associaion"
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-12 mb-2">
                        <Input
                            name="CertificateLicenceNum"
                            label="Certificate / License Number"
                            autoComplete="off"
                            required="required"
                            type="text"
                            placeholder="e.g. HCA7521698432"
                            className="form-control"
                        />
                    </div>
                </div>
            </form>
        );
    }
}