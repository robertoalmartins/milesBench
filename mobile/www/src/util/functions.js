    function getFormData($form){
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};

        $.map(unindexed_array, function(n, i){
            indexed_array[n['name']] = n['value'];
        });

        return indexed_array;
    }

    function ValidaCPF(cpf) {
        if (cpf != '') {
           return true;
        }
    	var numeros, digitos, soma, i, resultado, digitos_iguais;
    	digitos_iguais = 1;
    	if (cpf.length < 11)
    	      return false;
    	for (i = 0; i < cpf.length - 1; i++)
    	      if (cpf.charAt(i) != cpf.charAt(i + 1))
    	            {
    	            digitos_iguais = 0;
    	            break;
    	            }
    	if (!digitos_iguais)
    	      {
    	      numeros = cpf.substring(0,9);
    	      digitos = cpf.substring(9);
    	      soma = 0;
    	      for (i = 10; i > 1; i--)
    	            soma += numeros.charAt(10 - i) * i;
    	      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    	      if (resultado != digitos.charAt(0))
    	            return false;
    	      numeros = cpf.substring(0,10);
    	      soma = 0;
    	      for (i = 11; i > 1; i--)
    	            soma += numeros.charAt(11 - i) * i;
    	      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    	      if (resultado != digitos.charAt(1))
    	            return false;
    	      return true;
    	      }
    	else
    	    return false;
    }

    function ValidaCNPJ(cnpj) {
     
        cnpj = cnpj.replace(/[^\d]+/g,'');
     
        if(cnpj == '') return false;
         
        if (cnpj.length != 14)
            return false;
     
        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" || 
            cnpj == "11111111111111" || 
            cnpj == "22222222222222" || 
            cnpj == "33333333333333" || 
            cnpj == "44444444444444" || 
            cnpj == "55555555555555" || 
            cnpj == "66666666666666" || 
            cnpj == "77777777777777" || 
            cnpj == "88888888888888" || 
            cnpj == "99999999999999")
            return false;
             
        // Valida DVs
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0,tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
             
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
              return false;
               
        return true;
    }


    function gridSorter(columnField, isAsc, grid, gridData) {
        var sign = isAsc ? 1 : -1;
        var field = columnField
        gridData.sort(function (dataRow1, dataRow2) {
            var value1 = dataRow1[field], value2 = dataRow2[field];
            var result = (value1 == value2) ?  0 : ((value1 > value2 ? 1 : -1)) * sign;
            return result;
        });
        grid.invalidate();
        grid.render();
    }