/*
Copyright (c) 2014 Mika Hämäläinen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

package com.m1kah.service;

import com.m1kah.domain.Transaction;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Path("/transactions")
public class TransactionResource {
    private Map<Integer, Transaction> db = new ConcurrentHashMap<>();
    private AtomicInteger idCounter = new AtomicInteger();

    @POST
    @Consumes("application/json")
    public Response createTransaction(Transaction tx) {
        tx.setId(idCounter.incrementAndGet());
        db.put(tx.getId(), tx);
        return Response.created(URI.create("/transactions/" + tx.getId())).build();
    }

    @GET
    @Produces("application/json")
    public List<Transaction> getTransactions() {
        return new ArrayList<>(db.values());
    }

    @GET
    @Path("{id}")
    @Produces("application/json")
    public Transaction getTransaction(@PathParam("id") int id) {
        Transaction tx = db.get(id);
        if (tx == null) {
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        } else {
            return tx;
        }
    }
}
