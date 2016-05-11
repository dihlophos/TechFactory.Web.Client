function odataQuery(id) {
    this.queries = [];
    this.id = id;

    this.filter = function (expression) {
        this.queries.push("$filter=" + expression);
        return this;
    }

    this.expand = function (expression) {
        this.queries.push("$expand=" + expression);
        return this;
    }

    this.top = function (count) {
        this.queries.push("$top=" + count);
        return this;
    }

    this.getQuery = function () {
        return (this.id ? "(" + this.id + ")" : "") +
            (this.queries.length ? "?" : "") +
            this.queries.join("&");
    }
}