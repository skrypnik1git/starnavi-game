import React, { memo } from 'react';
import MainForm from '../components/MainForm';
import GameField from '../components/GameField';
import { connect } from 'react-redux';


const Home = props => {
        let { formError } = props
        return (
            <div className='d-flex flex-wrap justify-content-center align-items-center'>
                <div className='w-100 col-6 d-flex flex-column justify-content-start align-items-center'>
                    <MainForm />
                    {formError ? 
                        <div className="w-100 mt-4 p-2 border border-danger text-center">
                            Something goes wrong with data for the game. Please try again later.
                        </div> 
                        :
                        <GameField />
                    }
                </div>
            </div>
            
        )
}

function mapStateToProps(state) {
    return {
        formError: state.form.formError,
    }
}

export default connect(mapStateToProps, {})(memo(Home))