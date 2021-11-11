import React from 'react';
import { useIntl } from 'react-intl';
import {array, bool, func, object, shape, string} from "prop-types";
import defaultClasses from './createModal.css';
import FormError from "@magento/venia-ui/lib/components/FormError";
import Dialog from "@magento/venia-ui/lib/components/Dialog";
import Field from "@magento/venia-ui/lib/components/Field";
import TextInput from "@magento/venia-ui/lib/components/TextInput/textInput";
import TextArea from "@magento/venia-ui/lib/components/TextArea/textArea";
import {isRequired} from "@magento/venia-ui/lib/util/formValidators";
import {Text} from "informed";

const CreateModal = props => {
    const {
        classes: propClasses,
        formErrors,
        onCancel,
        onSubmit,
        isDisabled,
        isOpen,
        productSku
    } = props;
    const { formatMessage } = useIntl();

    const classes = defaultClasses;

    return (
        <Dialog
            classes={{ body: classes.bodyEditAccountInformation }}
            confirmText={'Send Inquiry'}
            isOpen={isOpen}
            onCancel={onCancel}
            onConfirm={onSubmit}
            shouldDisableAllButtons={isDisabled}
            shouldDisableConfirmButton={isDisabled}
            shouldUnmountOnHide={true}
            title={formatMessage({
                id: 'productInquiry.productInquiry',
                defaultMessage: 'Product Inquiry'
            })}
        >
            <FormError
                classes={{ root: classes.errorContainer }}
                errors={formErrors}
            />
            <div className={classes.name}>
                <Field
                    id="name"
                    label={formatMessage({
                        id: 'productInquiry.name',
                        defaultMessage: 'Name'
                    })}
                >
                    <TextInput field="name" validate={isRequired} />
                </Field>
            </div>
            <div className={classes.email}>
                <Field
                    id="email"
                    label={formatMessage({
                        id: 'productInquiry.email',
                        defaultMessage: 'Email'
                    })}
                >
                    <TextInput field="email" validate={isRequired} />
                </Field>
            </div>
            <div className={classes.mobile_number}>
                <Field
                    id="mobile_number"
                    label={formatMessage({
                        id: 'productInquiry.mobile_number',
                        defaultMessage: 'Mobile Number'
                    })}
                >
                    <TextInput field="mobile_number" />
                </Field>
            </div>
            <div className={classes.message}>
                <Field
                    id="message"
                    label={formatMessage({
                        id: 'productInquiry.message',
                        defaultMessage: 'Message'
                    })}
                >
                    <TextArea field="message" validate={isRequired}/>
                </Field>
            </div>
            <Text type="hidden" field="sku" initialValue={productSku} />
        </Dialog>
    );
};

export default CreateModal;

CreateModal.propTypes = {
    classes: shape({
        errorContainer: string
    }),
    formErrors: array,
    handleCancel: func,
    handleSubmit: func,
    initialValues: object,
    isDisabled: bool,
    isOpen: bool
};
