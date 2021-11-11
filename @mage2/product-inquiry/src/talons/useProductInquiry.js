import { useCallback, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

export const useProductInquiry = props => {
    const {
        mutations: {
            createInquiryMutation
        },
        queries: {
            getProductInquiries
        },
        productSku
    } = props;

    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [displayError, setDisplayError] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const [
        createInquiry,
        {
            error: createInquiryError,
            loading: isCreateInquiry
        }
    ] = useMutation(createInquiryMutation);

    const handleCancel = useCallback(() => {
        setIsUpdateMode(false);
    }, [setIsUpdateMode]);

    const showUpdateMode = useCallback(() => {
        setIsUpdateMode(true);
        setDisplayError(false);
        setDisplaySuccess(false);
    }, [setIsUpdateMode, setDisplayError, setDisplaySuccess]);

    const handleSubmit = useCallback(
        async ({ sku, name, email, mobile_number, message }) => {
            try {
                sku = sku.trim();
                name = name.trim();
                email = email.trim();
                mobile_number = mobile_number.trim();
                message = message.trim();

                await createInquiry({
                    variables: {
                        inquiryInput: {
                            sku: sku,
                            name: name,
                            email: email,
                            mobile_number: mobile_number,
                            message: message
                        }
                    }
                });

                handleCancel(false);
                setDisplaySuccess(true);
            } catch {
                setDisplayError(true);
                return;
            }
        },
        [
            createInquiry,
            handleCancel,
            setDisplaySuccess
        ]
    );

    const errors = displayError
        ? [createInquiryError]
        : [];

    const showViewMode = useCallback(() => {
        if (isOpen) {
            setIsOpen(false);
        }
        else {
            setIsOpen(true);
        }
    }, [isOpen, setIsOpen]);

    const productInquiriesResult = useQuery(getProductInquiries, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        skip: !productSku,
        variables: { sku: productSku, display_front: '1' }
    });

    const inquiriesData = (productInquiriesResult.data && productInquiriesResult.data.inquiry.totalCount > 0) ?
        productInquiriesResult.data.inquiry.items : [];

    return {
        handleCancel,
        formErrors: errors,
        handleSubmit,
        isDisabled: isCreateInquiry,
        isUpdateMode,
        showUpdateMode,
        displaySuccess,
        inquiriesErrors: Boolean(productInquiriesResult.error),
        isLoadingInquiries: productInquiriesResult.loading,
        inquiriesData,
        showViewMode,
        isOpen
    };
};
