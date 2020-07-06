import omit from 'lodash/omit';

export const dailyTicketIds = () => ({
    match: {
        created_at: {
            $gte: new Date().setHours(0, 0, 0, 0),
        },
    },
    sort: 'created_at',
    fields: ({ id, created_at, balance }) => ({ id, created_at, balance }),
    limit: null, // no limit
    skip: 0
});

export const dailyTicketOperations = () => ({
    match: {
        created_at: {
            $gte: new Date().setHours(0, 0, 0, 0),
        },
    },
    sort: 'created_at',
    fields: ({ operations }) => operations,
    limit: null, // no limit
    skip: 0
});

export const ticketById = (ticketId) => ({
    match: {
        id: {
            $eq: ticketId,
        },
    },
    fields: (ticket) => omit(ticket, '_rev'),
});

export const ticketByCreationDate = (ticketId) => ({
    match: {
        created_at: {
            $eq: ticketId,
        },
    },
    fields: (ticket) => omit(ticket, '_rev'),
});

export const ticketMatches = (field, value) => ({
    match: { [field]: { $regex: new RegExp(`^${value}`) } },
    fields: (ticket) => ticket[field],
});

export const dailyTickets = (limit, skip) => ({
    match: {
        created_at: {
            $gte: new Date().setHours(0, 0, 0, 0),
        },
    },
    sort: 'created_at',
    limit,
    skip
});

export const weeklyTickets = (limit = 0, skip = 0) => {
    const today = new Date();
    // today.setDate(today.getDate() - today.getDay());
    today.setDate(today.getDate() - 7);
    return {
        match: {
            created_at: {
                $gte: today.setHours(0, 0, 0, 0),
            },
            state: {
                $eq: 'TICKET_SOLD_STATE',
            },
        },
        sort: 'created_at',
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