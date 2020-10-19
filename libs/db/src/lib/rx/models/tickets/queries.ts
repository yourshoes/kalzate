import omit from 'lodash/omit';

export const dailyTicketIds = () => ({
    match: {
        selector: {
            createdAt: {
                $gte: new Date().setHours(0, 0, 0, 0),
            },
        }
    },
    sort: 'createdAt',
    fields: ({ id, createdAt, balance }) => ({ id, createdAt, balance }),
    limit: null, // no limit
    skip: 0
});

export const dailyTicketOperations = () => ({
    match: {
        selector: {
            createdAt: {
                $gte: new Date().setHours(0, 0, 0, 0),
            },
        }
    },
    sort: 'createdAt',
    fields: ({ operations }) => operations,
    limit: null, // no limit
    skip: 0
});

export const ticketById = (ticketId) => ({
    match: {
        selector: {
            id: {
                $eq: ticketId,
            },
        }
    },
    fields: (ticket) => omit(ticket, '_rev'),
});

export const ticketByCreationDate = (ticketId) => ({
    match: {
        selector: {
            createdAt: {
                $eq: ticketId,
            },
        }
    },
    fields: (ticket) => omit(ticket, '_rev'),
});

export const ticketMatches = (field, value) => ({
    match: { selector: { [field]: { $regex: new RegExp(`^${value}`) } } },
    fields: (ticket) => ticket[field],
});

export const dailyTickets = (limit, skip) => ({
    match: {
        selector: {
            createdAt: {
                $gte: new Date().setHours(0, 0, 0, 0),
            },
        }
    },
    sort: 'createdAt',
    limit,
    skip
});

export const weeklyTickets = (limit = 0, skip = 0) => {
    const today = new Date();
    // today.setDate(today.getDate() - today.getDay());
    today.setDate(today.getDate() - 7);
    return {
        match: {
            selector: {
                createdAt: {
                    $gte: today.setHours(0, 0, 0, 0),
                },
                state: {
                    $eq: 'TICKET_SOLD_STATE',
                },
            }
        },
        sort: 'createdAt',
        limit,
        skip,
    };
};

export default {
    dailyTicketIds,
    dailyTicketOperations,
    ticketById,
    ticketByCreationDate,
    ticketMatches,
    dailyTickets,
    weeklyTickets
}