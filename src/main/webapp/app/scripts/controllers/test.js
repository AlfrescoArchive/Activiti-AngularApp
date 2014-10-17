(function () {

    var picker = new Alfresco.ABObjectFinder("template_x002e_edit-metadata_x002e_edit-metadata_x0023_default_assoc_ab_buyerassoc-cntrl", "template_x002e_edit-metadata_x002e_edit-metadata_x0023_default_assoc_ab_buyerassoc").setOptions(
        {

            field: "assoc_ab_buyerassoc",
            compactMode: false,
            mandatory: false,
            currentValue: "",


            selectActionLabel: "Select",
            minSearchTermLength: 1,
            maxSearchResults: 1000
        }).setMessages(
        {"form.control.object-picker.items-list.search": "Enter a search term", "form.control.size.label": "Size", "form.control.date-picker.display.time.format": "HH:MM (24 Hour)", "form.control.mimetype.label": "Mimetype", "form.field.incomplete": "This field is mandatory but a value has not been provided.", "form.field.constraint.length": "This field must have between {0} and {1} characters.", "form.control.checkbox.no": "No", "form.control.association.message.error": "Unable to perform search", "form.control.object-picker.search": "Search", "form.control.object-picker.create-new.success": "Created new item \"{0}\"", "form.control.mimetype.unknown": "Unknown", "form.control.selectone.missing-options": "&lt;No options available&gt;", "form.control.object-picker.current.failure": "Could not display current values.", "form.required.fields": "Required Fields", "form.control.date-picker.choose": "Choose a date:", "form.button.reset.label": "Reset", "form.field.help": "Click to show and hide help text for the field.", "form.jsonsubmit.failed": "Failed to submit JSON data", "form.control.category.include.subcats": "Include Sub Categories", "form.control.object-picker.create-new.failure": "Could not create new item.", "form.control.period.type": "Period", "form.control.association.message.instructions": "Enter a search term", "form.control.date-picker.entry.datetime.format.nojs": "YYYY-MM-DDThh:mm:ss.sTZD", "form.control.association.message.empty": "No items found", "form.control.date-picker.entry.date.format": "d\/M\/yyyy", "form.control.date-range.to": "To", "form.control.date-range.from": "From", "form.control.range.max": "Max", "form.control.object-picker.items-list.empty": "No items found", "form.notset": "Not Set", "form.control.period.expression": "Expression", "form.control.association.message.searching": "Searching...", "form.control.date-picker.entry.time.format": "HH:mm", "form.control.checkbox.yes": "Yes", "form.control.object-picker.items-list.loading": "Loading...", "form.control.object-picker.description": "Description", "form.control.novalue": "(None)", "form.control.object-picker.workflow.view_more_actions": "View More Actions", "form.control.encoding.unknown": "Unknown", "form.field.not.editable": "This field is read-only as the system has prevented it from being edited.", "form.required.fields.marker": "*", "form.control.object-picker.remove-item": "Remove", "form.control.object-picker.add-item": "Add", "form.control.date-picker.display.date.format": "DD\/MM\/YYYY", "form.control.date-picker.view.date.format": "EEE dd MMM yyyy", "form.control.date-picker.view.time.format": "EEE dd MMM yyyy HH:mm:ss z", "form.field.constraint.number": "This field must contain a number.", "form.control.object-picker.create-new": "Create new item", "form.control.range.min": "Min", "form.control.object-picker.modified-on": "Modified on", "form.field.ambiguous": "is ambiguous, please contact your system administrator to remove this message.", "form.default.set.label": "Default", "form.button.cancel.label": "Cancel", "form.control.encoding.label": "Encoding", "form.control.object-picker.header": "Select...", "form.control.object-picker.selected-items.empty": "No items selected", "form.not.present": "A form could not be found, has an 'itemKind' and 'itemId' been provided?", "form.field.constraint.minmax": "This field must have a value between {0} and {1}.", "form.button.submit.label": "Submit", "form.control.object-picker.search.enter-more": "Enter at least {0} character(s) to search"}
    );
    picker.setOptions(
        {
            showLinkToTarget: true,
            targetLinkTemplate: "/share/page/document-details?nodeRef={nodeRef}",
            itemType: "ab:buyer",
            multipleSelectMode: true,
            parentNodeRef: "alfresco://company/home",
            rootNode: "/app:company_home/cm:Buyers",
            itemFamily: "node",
            displayMode: "items",
            /* finderAPI: Alfresco.constants.PROXY_URI + "com/alfrescoblog/search/node",*/
            searchMode: "true"
        });
})();
